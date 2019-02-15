import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { spinnable } from '../../common/utils/spinnable';
import SettingsResponse = Definitions.SettingsResponse;


@Injectable()
export class SettingsService {


  constructor(private httpClient: HttpClient) {}

  getSettings(): Observable<SettingsResponse> {
    return spinnable(
      this.httpClient.get<SettingsResponse>('/api/settings')
    );
  }

}
