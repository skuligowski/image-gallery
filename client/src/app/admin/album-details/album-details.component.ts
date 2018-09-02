import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Image = Definitions.Image;
import Album = Definitions.Album;
import LibraryFile = Definitions.LibraryFile;
import { LibraryFileSelectorComponent } from '../library-file-selector/library-file-selector.component';

@Component({
  selector: 'app-album-details',
  templateUrl: 'album-details.component.html'
})
export class AlbumDetailsComponent {

  album: Album;
  images: Image[];

  @ViewChild('fileSelector')
  fileSelector: LibraryFileSelectorComponent;

  constructor(private route: ActivatedRoute) {
    route.data.subscribe((data: any) => {
      this.album = data.album;
      this.images = data.album.images;
    });
  }

  addImages(files: LibraryFile[]): void {
    console.log('files', files);
    this.fileSelector.close();
  }
}
