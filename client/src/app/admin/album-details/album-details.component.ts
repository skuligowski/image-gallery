import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService, AlbumDetails} from '../../albums.service';
import { ConfirmationService } from 'primeng/api';
import { AlbumCreateEvent } from '../album-create/album-create.component';
import { LibraryFilesSelectorComponent } from '../library-files-selector/library-files-selector.component';
import { ThumbnailsService } from '../services/thumbnails.service';
import Image = Definitions.Image;
import Album = Definitions.Album;
import LibraryFile = Definitions.LibraryFile;
import { BatchProcessDoneEvent, BatchProcessingRevertEvent } from '../post-processing/batch-processing/batch-processing.component';
import { ProcessingService } from '../services/processing.service';
import { concatMap, delay, switchMap, tap, toArray } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { ProgressComponent } from '../../common/progress/progress.component';

@Component({
  selector: 'app-album-details',
  templateUrl: 'album-details.component.html',
  styleUrls: ['album-details.component.scss'],
})
export class AlbumDetailsComponent {

  album: Album;
  albums: Album[];
  images: Image[];
  current: Image;
  selected: Image[] = [];
  previewEnabled: boolean = false;
  reordered: boolean = false;
  orderHash: string;

  @ViewChild('libraryFilesSelector', { static: true })
  libraryFilesSelector: LibraryFilesSelectorComponent;

  @ViewChild('thumbnailsProgress', { static: true })
  thumbnailsProgress: ProgressComponent;

  @ViewChild('addingImagesProgress', { static: true })
  addingImagesProgress: ProgressComponent;

  constructor(private route: ActivatedRoute,
              private albumsService: AlbumsService,
              private thumbnailsService: ThumbnailsService,
              private processingService: ProcessingService,
              private router: Router,
              private confirmationService: ConfirmationService) {

    route.data.subscribe((data: any) => {
      this.album = data.album;
      this.albums = data.albums;
      this.images = data.album.images;
      this.orderHash = this.getOrderHash(this.images);
      this.onRowReorder();
    });
  }

  browseFiles() {
    const utilizedUrls = this.images
      .reduce((all, image) => {
        image.processing ? [image.processing.source.url, image.url] : [image.url]
        all.push(image.url);
        if (image.processing) {
          all.push(image.processing.source.url);
        }
        return all;
      }, []);
      this.libraryFilesSelector.open(utilizedUrls);
  }

  addImages(files: LibraryFile[]): void {
    const fileList = files
      .filter(file => !file.dir)
      .map(file => file.path);
    
    this.addingImagesProgress.open(fileList.length);
    this.albumsService.addImages(this.album.id, fileList)
      .pipe(        
        switchMap(() => 
          from(fileList).pipe(            
            concatMap(fileUrl => {
              this.addingImagesProgress.tick(`Adding ${fileUrl}`);
              return this.thumbnailsService.createThumbnail(fileUrl);
            }),
            toArray()
          )
        ),
        this.albumsService.refreshAlbums(),
        switchMap(() => this.albumsService.getAlbumDetailsById(this.album.id)),
        delay(1500),       
      ).subscribe(response => {
        this.addingImagesProgress.close();
        this.libraryFilesSelector.close();
        this.images = response.images;
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  removeImages(images: Image[]): void {
    this.albumsService.removeImages(this.album.id, images.map(image => image.filename))
      .subscribe(() => {
        this.selected = [];
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  removeAlbum(albumId: string): void {
    this.confirmationService.confirm({
      message: null,
      accept: () => {
        this.albumsService.removeAlbum(albumId)
          .subscribe(() => {
            this.router.navigate(['admin', 'albums']);
          });
      }
    });
  }

  onBatchProcessingDone(event: BatchProcessDoneEvent): void {
    of(event).pipe(this.albumsService.refreshAlbums())
     .pipe(switchMap(() => this.albumsService.getAlbumDetailsById(this.album.id)))
      .subscribe(response => {
        this.images = response.images;
        this.selected = [];
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
        event.close();
      });
  }

  onBatchProcessingRevert(event: BatchProcessingRevertEvent): void {
    this.processingService.revertProcessing(this.album.id, this.selected.map(image => image.url))
    .pipe(this.albumsService.refreshAlbums())
    .pipe(switchMap(() => this.albumsService.getAlbumDetailsById(this.album.id)))
      .subscribe(response => {
        this.images = response.images;
        this.selected = [];
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
        event.close();
      });
  }

  createThumbnails(images: Image[]): void {
    this.thumbnailsProgress.open(images.length);
    from(images.map(image => image.url))
      .pipe(
        concatMap(fileUrl => {
          this.thumbnailsProgress.tick(`Creating thub: ${fileUrl}`);
          return this.thumbnailsService.createThumbnail(fileUrl);
        }),
        toArray(),
        this.albumsService.refreshAlbums(),
        switchMap(() => this.albumsService.getAlbumDetailsById(this.album.id)),
        delay(1500),
      ).subscribe(response => {
        this.thumbnailsProgress.close();
        this.images = response.images;
        this.selected = [];
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  setImagesOrder(): void {
    this.albumsService.setImagesOrder(this.album.id, this.images.map(image => image.filename))
      .subscribe(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  onRowReorder(): void {
    this.reordered = this.getOrderHash(this.images) !== this.orderHash;
  }

  navigateToAlbums(): void {
    this.router.navigate(['admin', 'albums']);
  }

  onPreview(image: Image): void {
    this.current = image;
    this.previewEnabled = true;
  }

  onSelect(images: Image[]): void {
    this.selected = images;
  }

  onUpdateAlbum(event: AlbumCreateEvent): void {
    this.albumsService
      .patchAlbum(this.album.id, event.name, event.permalink, event.date)
      .subscribe(() => {
        event.close();
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  private getOrderHash(images): string {
    return images.reduce((str, image) => str.concat(image.filename), '');
  }
}
