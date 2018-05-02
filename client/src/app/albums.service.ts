import { Injectable } from '@angular/core';
import Album = Definitions.Album;
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw as throwError } from 'rxjs/observable/throw';
import { delay, tap } from 'rxjs/operators';
import AlbumDetails = Definitions.AlbumDetails;



const mockedAlbums = [
  { permalink: '2018/best-ever', name: 'Best ever album'}
];

const mockedAlbumDetails: AlbumDetails = {
  permalink: '2018/best-ever',
  name: 'Best ever album',
  photos: [
    {url: 'assets/some_1.jpg', filename: 'some_1.jpg'},
    {url: 'assets/some_2.jpg', filename: 'some_2.jpg'}
  ]
};


@Injectable()
export class AlbumsService {

  private albums: Album[];

  constructor() {}

  loadAlbums(): Observable<Album[]> {
    return of(mockedAlbums).pipe(
      delay(1000),
      tap(albums => {
        this.albums = albums;
      }));
  }

  getAlbums(): Album[] {
    return this.albums;
  }

  getAlbumDetails(albumPermalink: string): Observable<AlbumDetails> {
    const existingAlbum = this.albums.find(album => album.permalink === albumPermalink);
    if (!existingAlbum) {
      return throwError(new Error('Album does not exist'));
    }
    return of(mockedAlbumDetails).pipe(
      delay(1000)
    );
  }

}
