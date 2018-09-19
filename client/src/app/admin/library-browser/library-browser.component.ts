import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { Subscription } from 'rxjs';
import LibraryFile = Definitions.LibraryFile;
import { spinnable } from '../../common/utils/spinnable';

@Component({
  selector: 'app-library-browser',
  templateUrl: 'library-browser.component.html'
})
export class LibraryBrowserComponent implements OnInit, OnDestroy {
  files: LibraryFile[];
  cols: any[];
  loading = true;

  selectedFiles: LibraryFile[] = [];

  @Output()
  selectFiles: EventEmitter<LibraryFile[]> = new EventEmitter();

  @Input()
  insideSpinner = true;

  private subscription: Subscription = Subscription.EMPTY;

  loadInitialData(): void {
    this.selectedFiles = [];
    this.subscription = spinnable(this.libraryService.getFiles(null), this.insideSpinner)
      .subscribe(files => {
        this.files = files.sort(a => a.dir ? -1 : 1);
        this.loading = false;
      }, null, () => console.log('complete'));
  }

  constructor(private libraryService: LibraryService) {}

  ngOnInit() {
    this.cols = [
      { field: 'filename', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];
  }

  onDirSelect(dir: LibraryFile): void {
    if (dir) {
      this.loading = true;
      this.subscription.unsubscribe();
      this.subscription = spinnable(this.libraryService.getFiles(dir.path), this.insideSpinner)
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
