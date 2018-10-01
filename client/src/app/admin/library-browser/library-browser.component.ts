import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { Observable, Subscription } from 'rxjs';
import LibraryFile = Definitions.LibraryFile;
import { spinnable } from '../../common/utils/spinnable';
import { tap } from 'rxjs/operators';

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
  directoryChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  selectFiles: EventEmitter<LibraryFile[]> = new EventEmitter();

  @Input()
  insideSpinner = true;

  private currentDir: LibraryFile;
  private subscription: Subscription = Subscription.EMPTY;

  loadInitialData(): void {
    this.subscription = this.loadData(null)
      .subscribe();
  }

  loadData(parentDir?: string): Observable<LibraryFile[]> {
    this.selectedFiles = [];
    this.loading = true;
    return spinnable(this.libraryService.getFiles(parentDir), this.insideSpinner).pipe(
      tap(files => {
        this.setFiles(files);
        this.loading = false;
      })
    );
  }

  constructor(private libraryService: LibraryService) {}

  ngOnInit() {
    this.cols = [
      { field: 'filename', header: 'Name' },
      { field: 'size', header: 'Size' },
    ];
  }

  onDirSelect(dir: LibraryFile): void {
    if (dir) {
      this.loading = true;
      this.subscription.unsubscribe();
      this.subscription = spinnable(this.libraryService.getFiles(dir.path), this.insideSpinner)
        .subscribe(files => {
          this.currentDir = dir;
          this.directoryChange.emit(dir.path);
          this.setFiles(files);
          this.loading = false;
          this.selectedFiles = [];
        });
    }
  }

  private setFiles(files: LibraryFile[]): void {
    this.files = files.sort(a => a.dir ? -1 : 1);
    if (this.currentDir && this.currentDir.path) {
      this.files.unshift({
        filename: '..',
        path: this.currentDir.path.substr(0, this.currentDir.path.lastIndexOf('/')),
        dir: true,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
