import { Component, EventEmitter, Output } from '@angular/core';
import LibraryFile = Definitions.LibraryFile;

@Component({
  selector: 'app-library-files-selector',
  templateUrl: 'library-files-selector.component.html'
})
export class LibraryFilesSelectorComponent {

  display: boolean;

  selectedFiles: LibraryFile[] = [];

  @Output()
  selectFiles: EventEmitter<LibraryFile[]> = new EventEmitter();

  currentDirectory: string;

  constructor() {}

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

  onDirectoryChange(dirName: string): void {
    this.currentDirectory = dirName;
  }

}
