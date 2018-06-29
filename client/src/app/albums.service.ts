import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw as throwError } from 'rxjs/observable/throw';
import { map, tap } from 'rxjs/operators';
import { AlbumsDataService } from './albums-data.service';
import Album = Definitions.Album;
import Image = Definitions.Image;


@Injectable()
export class AlbumsService {

  private albums: Album[];
  private albumDetailsMap: {[albumId: string]: AlbumDetails} = {};

  private useCache = true;

  constructor(private albumsData: AlbumsDataService) {}

  loadAlbums(): Observable<Album[]> {
    return this.albumsData.getAlbums().pipe(
      tap(albums => {
        this.albums = albums;
      }));
  }

  getAlbums(): Album[] {
    return this.albums;
  }

  getAlbumDetails(albumPermalink: string): Observable<AlbumDetails> {
    const album = this.albums.find(album => album.permalink === albumPermalink);
    if (!album) {
      return throwError(new Error('Album does not exist'));
    }
    const albumDetails = this.albumDetailsMap[album.id];
    if (albumDetails && this.useCache) {
      return of(albumDetails);
    } else {
      return this.albumsData.getAlbumImages(album.id).pipe(
        map(images => ({
          ...album,
          images
        })),
        tap(albumDetails => this.albumDetailsMap[albumDetails.id] = albumDetails)
      );
    }
  }

}

export interface AlbumDetails extends Album {
  images: Image[];
}
