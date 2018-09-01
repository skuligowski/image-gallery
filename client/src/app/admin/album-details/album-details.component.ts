import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { AlbumsService } from '../../albums.service';
import { map } from 'rxjs/operators';
import Image = Definitions.Image;
import Album = Definitions.Album;
import LibraryFile = Definitions.LibraryFile;

@Component({
  selector: 'app-album-details',
  templateUrl: 'album-details.component.html'
})
export class AlbumDetailsComponent implements OnInit {

  album: Album;
  images: Image[];

  files: LibraryFile[];
  display: boolean;
  cols: any[];
  loading: boolean;
  selectedFiles: TreeNode[];

  constructor(private route: ActivatedRoute, private albumsService: AlbumsService) {
    route.data.subscribe((data: any) => {
      this.album = data.album;
      this.images = data.album.images;
    });
  }


  openAddImagesDialog(): void {
    this.display = true;
  }

  ngOnInit() {
    this.loading = false;
    this.cols = [
      { field: 'filename', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];
  }

  loadNodes(): void {
    this.albumsService.getFiles(null)
      .subscribe(files => this.files = files.sort(a => a.dir ? -1 : 1));
  }

  onDirSelect(dir: LibraryFile): void {
    if (dir) {
      this.loading = true;
      this.albumsService.getFiles(dir.path)
        .subscribe(files => {
          this.files = files.sort(a => a.dir ? -1 : 1);
          if (dir.path) {
            this.files.unshift({
              filename: '..',
              path: dir.path.substr(0, dir.path.lastIndexOf('/')),
              dir: true,
            });
          }
          this.loading = false;
          this.selectedFiles = [];
        });
    }
  }

  addImages(): void {
    console.log(this.selectedFiles);
  }
}
