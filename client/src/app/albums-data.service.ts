import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import Album = Definitions.Album;
import AlbumDetails = Definitions.AlbumDetails;


const mockedAlbums = [
  { id: '1', permalink: '2018/best-ever', name: 'Best ever album'}
];

const mockedAlbumDetails: AlbumDetails = {
  id: '1',
  permalink: '2018/best-ever',
  name: 'Best ever album',
  photos: [
    {url: 'assets/some_1.jpg', filename: 'some_1.jpg'},
    {url: 'assets/some_3.jpg', filename: 'some_2.jpg'},
    {url: 'assets/some_2.jpg', filename: 'some_3.jpg'},
    {url: 'assets/some_1.jpg', filename: 'some_4.jpg'},
    {url: 'assets/some_3.jpg', filename: 'some_5.jpg'},
    {url: 'assets/some_2.jpg', filename: 'some_6.jpg'},
    {url: 'assets/some_1.jpg', filename: 'some_7.jpg'},
    {url: 'assets/some_3.jpg', filename: 'some_8.jpg'},
    {url: 'assets/some_2.jpg', filename: 'some_9.jpg'},
    {url: 'assets/some_1.jpg', filename: 'some_10.jpg'}
  ]
};


@Injectable()
export class AlbumsDataService {

  constructor() {}

  getAlbums(): Observable<Album[]> {
    return of(mockedAlbums).pipe(delay(1000));
  }

  getAlbumDetails(albumId: string): Observable<AlbumDetails> {
    return of(mockedAlbumDetails).pipe(delay(1000));
  }

}
