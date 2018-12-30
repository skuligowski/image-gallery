import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { LibraryDirectoryCreateEvent } from '../library-directory-create/library-directory-create.component';
import { LibraryService } from '../services/library.service';
import { LibraryBrowserComponent } from '../library-browser/library-browser.component';
import LibraryFile = Definitions.LibraryFile;

@Component({
  selector: 'app-library-files',
  templateUrl: 'library-files.component.html'
})
export class LibraryFilesComponent {

  display: boolean;

  selectedFiles: LibraryFile[] = [];

  @Output()
  selectFiles: EventEmitter<LibraryFile[]> = new EventEmitter();

  currentDirectory: string;

  @ViewChild('libraryBrowser')
  libraryBrowser: LibraryBrowserComponent;

  constructor(private libraryService: LibraryService) {}

  open(): void {
    this.selectedFiles = [];
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  addImages(): void {
    if (this.selectedFiles.length) {
      this.selectFiles.emit(this.selectedFiles);
    }
  }

  onCreateDirectory(createEvent: LibraryDirectoryCreateEvent): void {
    this.libraryService.createDirectory(this.currentDirectory, createEvent.name)
      .subscribe(() => {
        createEvent.close();
        this.libraryBrowser.loadData(this.currentDirectory)
          .subscribe();
      });
  }

  onDirectoryChange(dirName: string): void {
    this.currentDirectory = dirName;
  }

  onUpload(): void {
    this.libraryBrowser.loadData(this.currentDirectory)
      .subscribe();
  }
}
