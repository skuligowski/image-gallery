import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { spinnable } from '../../common/utils/spinnable';
import Settings = Definitions.Settings;
import Validation = Definitions.Validation;


@Injectable()
export class SettingsService {


  constructor(private httpClient: HttpClient) {}

  getSettings(): Observable<Settings> {
    return spinnable(
      this.httpClient.get<Settings>('/api/settings')
    );
  }

  modifySettings(settings: Settings): Observable<any> {
    return spinnable(
      this.httpClient.patch<any>('/api/settings', settings)
    );
  }

  validateLibraryDir(libraryDir: string): Observable<Validation> {
    return this.httpClient.post<Validation>('/api/settings/library-dir/validation', { libraryDir });
  }
}
