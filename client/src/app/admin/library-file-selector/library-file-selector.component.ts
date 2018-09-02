import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import LibraryFile = Definitions.LibraryFile;
import { AlbumsService } from '../../albums.service';
import { spinnable } from '../../common/utils/spinnable';

@Component({
  selector: 'app-library-file-selector',
  templateUrl: 'library-file-selector.component.html'
})
export class LibraryFileSelectorComponent implements OnInit {

  files: LibraryFile[];
  display: boolean;
  cols: any[];
  loading: boolean;
  selectedFiles: TreeNode[];

  constructor(private albumsService: AlbumsService) {}

  open(): void {
    spinnable(this.albumsService.getFiles(null))
      .subscribe(files => {
        this.files = files.sort(a => a.dir ? -1 : 1);
        this.display = true;
      });
  }

  ngOnInit() {
    this.loading = false;
    this.cols = [
      { field: 'filename', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];
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
