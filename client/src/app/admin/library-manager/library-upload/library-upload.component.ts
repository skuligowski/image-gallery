import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LibraryService } from '../../services/library.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-library-upload',
  templateUrl: 'library-upload.component.html'
})
export class LibraryUploadComponent implements OnInit {

  display = false;
  files: FileList = undefined;
  currentDirectory = '';

  @Output()
  upload: EventEmitter<FileList> = new EventEmitter<FileList>();

  constructor(private libraryService: LibraryService, private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  open(currentDirectory: string): void {
    this.currentDirectory = currentDirectory;
    const uploadInput = this.renderer.createElement('input');
    this.renderer.setAttribute(uploadInput, 'type', 'file');
    this.renderer.setAttribute(uploadInput, 'multiple', 'true');
    uploadInput.click();
    this.renderer.listen(uploadInput, 'change', () => {
      if (uploadInput.files.length) {
        this.display = true;
        this.files = uploadInput.files;
        this.uploadFiles(this.files);
      }
    });
  }

  private uploadFiles(files: FileList): void {
    const filesUpload$ = Array.from(files).map(file =>
      this.libraryService.upload(this.currentDirectory, file).pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% loaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely loaded!');
        }
      }))
    );
    forkJoin(filesUpload$).subscribe(event => {
      console.log('Done');
      console.log(event);
      this.upload.emit(files);
    });
  }

  close(): void {
    this.display = false;
  }
}
