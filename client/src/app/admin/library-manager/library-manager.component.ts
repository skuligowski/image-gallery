import { Component, ViewChild } from '@angular/core';
import { LibraryDirectoryCreateEvent } from './library-directory-create/library-directory-create.component';
import { LibraryService } from '../services/library.service';
import { LibraryBrowserComponent } from '../library-browser/library-browser.component';
import LibraryFile = Definitions.LibraryFile;
import Album = Definitions.Album;
import AlbumCreateResponse = Definitions.AlbumCreateResponse;
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumCreateEvent } from '../album-create/album-create.component';
import { AlbumsService } from '../../albums.service';
import { from, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { ProgressComponent } from '../../common/progress/progress.component';
import { concatMap, delay, map, switchMap, tap, toArray, withLatestFrom } from 'rxjs/operators';
import { ThumbnailsService } from '../services/thumbnails.service';
import { BehaviorSubject } from 'rxjs/index';

@Component({
  selector: 'app-library-manager',
  templateUrl: 'library-manager.component.html'
})
export class LibraryManagerComponent {

  display: boolean;

  selectedFiles: LibraryFile[] = [];

  currentDirectory: string;

  @ViewChild('libraryBrowser', { static: true })
  libraryBrowser: LibraryBrowserComponent;

  @ViewChild('addingImagesProgress', { static: true })
  addingImagesProgress: ProgressComponent;

  albums: Album[] = [];

  constructor(
    private libraryService: LibraryService, 
    private route: ActivatedRoute, 
    private albumsService: AlbumsService,
    private router: Router,
    private thumbnailsService: ThumbnailsService) {
    route.data.subscribe(data => {
      this.albums = data.albums;
    });
  }

  open(): void {
    this.selectedFiles = [];
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  onCreateDirectory(createEvent: LibraryDirectoryCreateEvent): void {
    this.libraryService.createDirectory(this.currentDirectory, createEvent.name)
      .subscribe(() => {
        createEvent.close();
        this.libraryBrowser.loadData(this.currentDirectory)
          .subscribe();
      });
  }

  onCreateAlbum(event: AlbumCreateEvent): void {
    const fileList = this.selectedFiles
      .filter(file => !file.dir)
      .map(file => file.path);

    const createAlbumResponse$: BehaviorSubject<AlbumCreateResponse> = new BehaviorSubject(null);

    let subscription: Subscription = Subscription.EMPTY;  
    this.addingImagesProgress.open(this.selectedFiles.length)
      .then(() => subscription.unsubscribe());
    subscription = this.albumsService.createAlbum(event.name, event.permalink, event.date)
      .pipe(
        tap(albumCreateResponse => createAlbumResponse$.next(albumCreateResponse)),
        switchMap(({id}) => this.albumsService.addImages(id, fileList)),
        switchMap(() => 
          from(fileList).pipe(            
            concatMap(fileUrl => {
              this.addingImagesProgress.tick(`Adding ${fileUrl}`);
              return this.thumbnailsService.createThumbnail(fileUrl);
            }),
            toArray()
          ),
        ),
        delay(1500),
        this.albumsService.refreshAlbums(),
        map(() => createAlbumResponse$.getValue()),
      )
      .subscribe(albumCreateResponse => {
        this.addingImagesProgress.close();
        event.close();
        this.router.navigated = false;
        this.router.navigate(['admin', 'albums', albumCreateResponse.id]);
      });
  }
  
  onDirectoryChange(dirName: string): void {
    this.currentDirectory = dirName;
    this.selectedFiles = [];
  }

  onUpload(): void {
    this.libraryBrowser.loadData(this.currentDirectory)
      .subscribe();
  }
}
