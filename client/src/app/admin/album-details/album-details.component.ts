import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from '../../albums.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AlbumCreateEvent } from '../album-create/album-create.component';
import { LibraryFilesSelectorComponent } from '../library-files-selector/library-files-selector.component';
import { ThumbnailsService } from '../services/thumbnails.service';
import Image = Definitions.Image;
import Album = Definitions.Album;
import LibraryFile = Definitions.LibraryFile;
import { BatchProcessingDoneEvent, BatchProcessingRevertEvent } from '../post-processing/batch-processing/batch-processing.component';
import { ProcessingService } from '../services/processing.service';
import { concatMap, delay, switchMap, tap, toArray } from 'rxjs/operators';
import { Subscription, from, of } from 'rxjs';
import { ProgressComponent } from '../../common/progress/progress.component';
import { ManualProcessingDoneEvent } from '../post-processing/manual-processing/manual-processing.component';

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

  @ViewChild('libraryFilesSelector', { static: true })
  libraryFilesSelector: LibraryFilesSelectorComponent;

  @ViewChild('thumbnailsProgress', { static: true })
  thumbnailsProgress: ProgressComponent;

  @ViewChild('addingImagesProgress', { static: true })
  addingImagesProgress: ProgressComponent;

  @ViewChild('revertProgress', { static: true })
  revertProgress: ProgressComponent;

  sortMenuItems: MenuItem[] = [
    {
      label: 'By filename asc', 
      icon: 'pi pi-fw pi-sort-alpha-up', 
      command: () => this.sortBy('filename', 'asc') 
    },
    {
      label: 'By filename desc', 
      icon: 'pi pi-fw pi-sort-alpha-down-alt',
      command: () => this.sortBy('filename', 'desc'),
    },
  ];

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
    
    let subscription: Subscription = Subscription.EMPTY;  
    this.addingImagesProgress.open(fileList.length).then(() => subscription.unsubscribe());
    subscription = this.albumsService.addImages(this.album.id, fileList)
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

  onProcessingDone(event: BatchProcessingDoneEvent | ManualProcessingDoneEvent): void {
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
    const fileList = this.selected.map(image => image.url);
    
    let subscription: Subscription = Subscription.EMPTY;  
    this.revertProgress.open(fileList.length).then(() => subscription.unsubscribe());
    subscription = this.processingService.revertProcessing(this.album.id, fileList)
      .pipe(        
        switchMap(images => 
          from(images).pipe(            
            concatMap(image => {
              this.revertProgress.tick(`Reverting ${image.filename}`);
              return this.thumbnailsService.createThumbnail(image.url);
            }),
            toArray()
          )
        ),
        this.albumsService.refreshAlbums(),
        switchMap(() => this.albumsService.getAlbumDetailsById(this.album.id))
      )
      .subscribe(response => {
        this.revertProgress.close();
        this.images = response.images;
        this.selected = [];
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
        event.close();
      });
  }

  createThumbnails(images: Image[]): void {
    let subscription: Subscription = Subscription.EMPTY;  
    this.thumbnailsProgress.open(images.length)
      .then(() => subscription.unsubscribe());
    subscription = from(images.map(image => image.url))
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
  
  sortBy(param: 'filename', order: 'asc'|'desc'): void {
    const filenames = this.images
        .sort((a: Image, b: Image) => (order === 'asc' ? 1 : -1) * a[param].localeCompare(b[param]))
        .map(image => image.filename);
    
    this.albumsService.setImagesOrder(this.album.id, filenames)
      .subscribe(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
    });
  }

  onRowReorder(): void {
    this.albumsService.setImagesOrder(this.album.id, this.images.map(image => image.filename))
      .subscribe(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
    });
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
      .patchAlbum(this.album.id, event)
      .subscribe(() => {
        event.close();
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  publish(): void {
    this.albumsService
    .patchAlbum(this.album.id, {active: true})
    .subscribe(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }

  suspend(): void {
    this.albumsService
    .patchAlbum(this.album.id, {active: false})
    .subscribe(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }
}
