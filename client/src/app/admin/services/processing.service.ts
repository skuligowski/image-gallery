import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { spinnable } from '../../common/utils/spinnable';
import ProcessingResizeParams = Definitions.ProcessingResizeParams;
import ProcessingSharpenParams = Definitions.ProcessingSharpenParams;
import ProcessingRequest = Definitions.ProcessingRequest;
import ProcessingRevertRequest = Definitions.ProcessingRevertRequest;
import ImagesResponse = Definitions.ImagesResponse;
import Image= Definitions.Image;



@Injectable()
export class ProcessingService {

  constructor(private httpClient: HttpClient) {}

  runProcessing(albumId: string, request: ProcessingRequest): Observable<any> {
      return this.httpClient.post<Image>(`/api/albums/${albumId}/processing`, request)
      
  }

  revertProcessing(albumId: string, imageUrls: string[]): Observable<ImagesResponse> {
    return spinnable(
      this.httpClient.post<ImagesResponse>(`/api/albums/${albumId}/processing/revert`, {
        urls: imageUrls,
      })
    );
  }
}
