import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryDirectoryCreateEvent } from '../library-directory-create/library-directory-create.component';
import { LibraryService } from '../services/library.service';
import { LibraryBrowserComponent } from '../library-browser/library-browser.component';


@Component({
  selector: 'app-library-manager',
  templateUrl: 'library-manager.component.html'
})
export class LibraryManagerComponent implements OnInit {

  @ViewChild('libraryBrowser')
  libraryBrowser: LibraryBrowserComponent;

  private currentDirectory: string;

  constructor(private router: Router, private libraryService: LibraryService) {
  }

  ngOnInit() {

  }

  navigateToGallery(): void {
    this.router.navigate(['/']);
  }

  navigateToAlbums(): void {
    this.router.navigate(['admin', 'albums']);
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
}
