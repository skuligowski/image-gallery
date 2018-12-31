import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LibraryService } from '../../services/library.service';
import { concat, EMPTY, forkJoin } from 'rxjs';
import { catchError, tap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-library-upload',
  templateUrl: 'library-upload.component.html'
})
export class LibraryUploadComponent {

  display = false;
  files: FileItem[] = undefined;
  currentDirectory = '';

  @Output()
  upload: EventEmitter<FileItem[]> = new EventEmitter<FileItem[]>();

  constructor(private libraryService: LibraryService, private renderer: Renderer2) {
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
        this.files = Array.from(uploadInput.files as FileList).map(file => ({
          file,
          name: file.name,
          progress: 0,
          downloaded: false,
          size: file.size
        }));
        this.uploadFiles(this.files);
      }
    });
  }

  private uploadFiles(files: FileItem[]): void {
    const filesUpload$ = files.map(file =>
      this.libraryService.upload(this.currentDirectory, file.file).pipe(
        tap(event => {
          if (event.type === HttpEventType.UploadProgress) {
            file.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            file.downloaded = true;
          }
        })),
        catchError(() => {
          return EMPTY;
        })
    );
    const chunks = [];
    for (let i = 0; i < filesUpload$.length; i = i + 4) {
      chunks.push(forkJoin(filesUpload$.slice(i, i + 4)));
    }
    concat(...chunks).pipe(toArray()).subscribe(() => {
      this.upload.emit(files);
    });
  }

  close(): void {
    this.display = false;
  }
}

interface FileItem {
  file: File;
  name: string;
  progress: number;
  downloaded: boolean;
  size: number;
}
