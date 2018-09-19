import { Component, EventEmitter, Output } from '@angular/core';
import LibraryFile = Definitions.LibraryFile;

@Component({
  selector: 'app-library-file-selector',
  templateUrl: 'library-file-selector.component.html'
})
export class LibraryFileSelectorComponent {

  display: boolean;

  selectedFiles: LibraryFile[] = [];

  @Output()
  selectFiles: EventEmitter<LibraryFile[]> = new EventEmitter();


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
}
