import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { spinnable } from '../../common/utils/spinnable';
import ProcessingResizeParams = Definitions.ProcessingResizeParams;
import ProcessingSharpenParams = Definitions.ProcessingSharpenParams;
import ProcessingRequest = Definitions.ProcessingRequest;
import ProcessingRevertRequest = Definitions.ProcessingRevertRequest;



@Injectable()
export class ProcessingService {

  constructor(private httpClient: HttpClient) {}

  runProcessing(albumId: string, request: ProcessingRequest): Observable<any> {
      return this.httpClient.post<ProcessingRequest>(`/api/albums/${albumId}/processing`, request)
      
  }

  revertProcessing(albumId: string, imageUrls: string[]): Observable<any> {
    return spinnable(
      this.httpClient.post<ProcessingRevertRequest>(`/api/albums/${albumId}/processing/revert`, {
        urls: imageUrls,
      })
    );
  }
}
