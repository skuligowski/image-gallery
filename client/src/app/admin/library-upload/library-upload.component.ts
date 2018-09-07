import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library-upload',
  templateUrl: 'library-upload.component.html'
})
export class LibraryUploadComponent implements OnInit {
  constructor(private libraryService: LibraryService) {
  }

  ngOnInit() {
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
    event.preventDefault();
    event.stopPropagation();
  }

  public onDragEnter(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
