import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from '../../albums.service';
import { ConfirmationService } from 'primeng/api';
import { AlbumCreateEvent } from '../album-create/album-create.component';
import { LibraryFilesSelectorComponent } from '../library-files-selector/library-files-selector.component';
import { ThumbnailsService } from '../services/thumbnails.service';
import Image = Definitions.Image;
import Album = Definitions.Album;
import LibraryFile = Definitions.LibraryFile;

@Component({
  selector: 'app-album-details',
  templateUrl: 'album-details.component.html',
  styleUrls: ['album-details.component.scss'],
})
export class AlbumDetailsComponent {

  album: Album;
  albums: Album[];
  images: Image[];
  selected: Image[] = [];

  reordered: boolean = false;
  orderHash: string;

  @ViewChild('libraryFilesSelector', { static: true })
  libraryFilesSelector: LibraryFilesSelectorComponent;

  constructor(private route: ActivatedRoute,
              private albumsService: AlbumsService,
              private thumbnailsService: ThumbnailsService,
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

  addImages(files: LibraryFile[]): void {
    this.albumsService.addImages(this.album.id, files
      .filter(file => !file.dir)
      .map(file => file.path))
      .subscribe(() => {
        this.libraryFilesSelector.close();
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

  createThumbnails(images: Image[]): void {
    this.thumbnailsService.createThumbnails(images.map(image => image.url))
      .pipe(this.albumsService.refreshAlbums())
      .subscribe(() => {
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

  onUpdateAlbum(event: AlbumCreateEvent): void {
    this.albumsService
      .patchAlbum(this.album.id, event.name, event.permalink, event.date)
      .subscribe(() => {
        event.close();
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  onBatchProcessing(event: any): void {
    event.close();
  }

  private getOrderHash(images): string {
    return images.reduce((str, image) => str.concat(image.filename), '');
  }
}
