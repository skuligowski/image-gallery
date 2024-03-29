import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { spinnable } from '../../common/utils/spinnable';
import ThumbnailsCreateRequest = Definitions.ThumbnailsCreateRequest;


@Injectable()
export class ThumbnailsService {

  constructor(private httpClient: HttpClient) {}

  createThumbnail(imageUrl: string): Observable<any> {
    return this.httpClient.post<ThumbnailsCreateRequest>(`/api/thumbnails`, {url: imageUrl});
  }
}
