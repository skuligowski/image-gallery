import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw as throwError } from 'rxjs/observable/throw';
import { tap } from 'rxjs/operators';
import { AlbumsDataService } from './albums-data.service';
import Album = Definitions.Album;
import AlbumDetails = Definitions.AlbumDetails;


@Injectable()
export class AlbumsService {

  private albums: Album[];
  private albumDetailsMap: {[albumId: string]: AlbumDetails} = {};

  constructor(private albumsData: AlbumsDataService) {}

  loadAlbums(): Observable<Album[]> {
    return this.albumsData.getAlbums().pipe(
      tap(albums => this.albums = albums));
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
    return albumDetails ? of(albumDetails) : this.albumsData.getAlbumDetails(album.id).pipe(
      tap(albumDetails => this.albumDetailsMap[albumDetails.id] = albumDetails));
  }

}
