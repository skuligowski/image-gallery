import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Image = Definitions.Image;
import Album = Definitions.Album;
import LibraryFile = Definitions.LibraryFile;
import { LibraryFileSelectorComponent } from '../library-file-selector/library-file-selector.component';
import { AlbumsService } from '../../albums.service';

@Component({
  selector: 'app-album-details',
  templateUrl: 'album-details.component.html'
})
export class AlbumDetailsComponent {

  album: Album;
  images: Image[];

  @ViewChild('fileSelector')
  fileSelector: LibraryFileSelectorComponent;

  constructor(private route: ActivatedRoute, private albumsService: AlbumsService, private router: Router) {
    route.data.subscribe((data: any) => {
      this.album = data.album;
      this.images = data.album.images;
    });
  }

  addImages(files: LibraryFile[]): void {
    this.albumsService.addImages(this.album.id, files
      .filter(file => !file.dir)
      .map(file => file.path))
      .subscribe(() => {
        this.fileSelector.close();
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }
}
