import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import Album = Definitions.Album;
import Image = Definitions.Image;
import { spinnable } from './common/utils/spinnable';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';


@Injectable()
export class AlbumsService {

  private albums: Album[];
  private albumDetailsMap: {[albumId: string]: AlbumDetails} = {};

  private useCache = true;

  constructor(private httpClient: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.albums ? of(this.albums) : spinnable(
      this.httpClient.get<Album[]>('/api/albums')
    ).pipe(tap(albums => this.albums = albums));
  }

  getImages(albumId: string): Observable<Image[]> {
    return spinnable(
      this.httpClient.get<Image[]>(`/api/albums/${albumId}/images`)
    );
  }

  getAlbumDetails(albumPermalink: string): Observable<AlbumDetails> {
    return this.getAlbums().pipe(switchMap(albums => {
      const album = albums.find(album => album.permalink === albumPermalink);
      if (!album) {
        return throwError(new Error('Album does not exist'));
      }
      const albumDetails = this.albumDetailsMap[album.id];
      if (albumDetails && this.useCache) {
        return of(albumDetails);
      } else {
        return this.getImages(album.id).pipe(
          map(images => ({
            ...album,
            images
          })),
          tap(albumDetails => this.albumDetailsMap[albumDetails.id] = albumDetails)
        );
      }
    }));
  }

  upload(files: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', files);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', '/api/upload', formData, options);
    return this.httpClient.request(req);
  }

}

export interface AlbumDetails extends Album {
  images: Image[];
}
