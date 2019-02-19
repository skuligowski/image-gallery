import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { spinnable } from '../../common/utils/spinnable';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Config = Definitions.Config;

@Injectable()
export class ConfigService {

  galleryName: string;

  constructor(private httpClient: HttpClient) {}

  loadConfig(): Observable<Config> {
    return spinnable(
      this.httpClient.get<Config>('/api/config')
        .pipe(
          tap(config => {
            this.galleryName = config.galleryName;
          }));
  }
}
