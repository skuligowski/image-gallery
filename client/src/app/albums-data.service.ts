import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { spinnable } from './common/utils/spinnable';
import { HttpClient } from '@angular/common/http';
import Image = Definitions.Image;
import Album = Definitions.Album;


@Injectable()
export class AlbumsDataService {

  constructor(private httpClient: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return spinnable(
      this.httpClient.get<Album[]>('/api/albums')
    );
  }

  getImages(albumId: string): Observable<Image[]> {
    return spinnable(
      this.httpClient.get<Image[]>(`/api/albums/${albumId}/images`)
    );
  }

}
