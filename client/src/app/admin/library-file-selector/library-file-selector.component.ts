import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { spinnable } from '../../common/utils/spinnable';
import { LibraryService } from '../services/library.service';
import LibraryFile = Definitions.LibraryFile;

@Component({
  selector: 'app-library-file-selector',
  templateUrl: 'library-file-selector.component.html'
})
export class LibraryFileSelectorComponent implements OnInit {

  files: LibraryFile[];
  display: boolean;
  cols: any[];
  loading: boolean;

  selectedFiles: LibraryFile[] = [];

  @Output()
  selectFiles: EventEmitter<LibraryFile[]> = new EventEmitter();

  constructor(private libraryService: LibraryService) {}

  open(): void {
    this.selectedFiles = [];
    spinnable(this.libraryService.getFiles(null))
      .subscribe(files => {
        this.files = files.sort(a => a.dir ? -1 : 1);
        this.display = true;
      });
  }

  close(): void {
    this.display = false;
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
      this.libraryService.getFiles(dir.path)
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
    if (this.selectedFiles.length) {
      this.selectFiles.emit(this.selectedFiles);
    }
  }
}
