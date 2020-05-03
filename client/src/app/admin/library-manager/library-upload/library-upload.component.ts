import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LibraryService } from '../../services/library.service';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, last, mergeMap, tap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-library-upload',
  templateUrl: 'library-upload.component.html',
  styleUrls: ['library-upload.component.scss'],
})
export class LibraryUploadComponent {

  display = false;
  files: FileItem[] = undefined;
  currentDirectory = '';
  closeEnabled = false;

  @Output()
  upload: EventEmitter<FileItem[]> = new EventEmitter<FileItem[]>();

  constructor(private libraryService: LibraryService, private renderer: Renderer2) {
  }

  open(currentDirectory: string): void {
    this.closeEnabled = false;
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
          error: false,
          size: file.size
        }));
        this.uploadFiles(this.files);
      }
    });
  }

  private createUploadCall(file: FileItem): Observable<any> {
    return this.libraryService.upload(this.currentDirectory, file.file).pipe(
      tap(event => {
        if (event.type === HttpEventType.UploadProgress) {
          file.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          file.downloaded = true;
        }
      }),
      catchError(() => {
        file.error = true;
        return EMPTY;
      }),
    );
  }

  private uploadFiles(files: FileItem[]): void {
    from(files).pipe(
      mergeMap(file => this.createUploadCall(file).pipe(last()), 3),
      toArray()
    ).subscribe(() => {
      this.closeEnabled = true;
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
  error: boolean;
  size: number;
}
