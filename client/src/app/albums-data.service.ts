import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { spinnable } from './common/utils/spinnable';
import Image = Definitions.Image;
import Album = Definitions.Album;
import { map } from 'rxjs/internal/operators';

interface MockedAlbum {
  id: string;
  permalink: string;
  name: string;
  tree: string[];
  images: Image[];
}

const albums: MockedAlbum[] = [{
  id: '1',
  permalink: '2018/best-ever',
  name: 'Best album ever',
  tree: ['2018', 'Best ever'],
  images: [
    {url: 'assets/some_1.jpg', filename: 'some_1.jpg', width: 1500, height: 1000},
    {url: 'assets/some_3.jpg', filename: 'some_2.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_3.jpg', width: 1200, height: 800},
    {url: 'assets/some_3.jpg', filename: 'some_4.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_5.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_6.jpg', width: 1500, height: 1000},
    {url: 'assets/some_1.jpg', filename: 'some_7.jpg', width: 1500, height: 1000},
    {url: 'assets/some_3.jpg', filename: 'some_8.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_9.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_10.jpg', width: 1500, height: 1000}
  ]
}, {
  id: '2',
  permalink: '2018/other-album',
  name: 'Other album',
  tree: ['2018', 'Other album'],
  images: [
    {url: 'assets/some_3.jpg', filename: 'some_42.jpg', width: 1280, height: 1920},
    {url: 'assets/some_2.jpg', filename: 'some_52.jpg', width: 1200, height: 800},
    {url: 'assets/some_1.jpg', filename: 'some_62.jpg', width: 1500, height: 1000},
  ]
}];

const mockedAlbums: Album[] = albums.map(album => ({
  ...album,
  thumbUrl: album.images[0].url,
  size: album.images.length
}));

@Injectable()
export class AlbumsDataService {

  constructor() {}

  getAlbums(): Observable<Album[]> {
    return spinnable(
      of(mockedAlbums).pipe(delay(0))
    );
  }

  getAlbumImages(albumId: string): Observable<Image[]> {
    return spinnable(
      of(albums.find(album => album.id === albumId)).pipe(
        delay(0),
        map(album => album.images)
      )
    );
  }

}
