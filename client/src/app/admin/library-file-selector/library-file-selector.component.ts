import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import LibraryFile = Definitions.LibraryFile;
import { LibraryDirectoryCreateEvent } from '../library-directory-create/library-directory-create.component';
import { LibraryService } from '../services/library.service';
import { LibraryBrowserComponent } from '../library-browser/library-browser.component';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-library-file-selector',
  templateUrl: 'library-file-selector.component.html'
})
export class LibraryFileSelectorComponent {

  display: boolean;

  selectedFiles: LibraryFile[] = [];

  @Output()
  selectFiles: EventEmitter<LibraryFile[]> = new EventEmitter();

  private currentDirectory: string;

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

  public onDrop(event: DragEvent): void {
    console.log('drop', event.dataTransfer.files);
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      this.libraryService.upload(event.dataTransfer.files[i]).subscribe(
        event => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log('Upload Error:', err);
        }, () => {
          console.log('Upload done');
        }
      );
    }
    event.preventDefault();
    event.stopPropagation();
  }

  public onDragOver(event: Event): void {
    console.log('draggggg');
    event.preventDefault();
    event.stopPropagation();
  }

  public onDragEnter(event: Event): void {
    console.log('drag enter');
    event.preventDefault();
    event.stopPropagation();
  }
}
