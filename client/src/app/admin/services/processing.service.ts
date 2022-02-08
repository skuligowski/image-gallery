import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { spinnable } from '../../common/utils/spinnable';
import ProcessingResizeParams = Definitions.ProcessingResizeParams;
import ProcessingSharpenParams = Definitions.ProcessingSharpenParams;
import BatchProcessingRequest = Definitions.BatchProcessingRequest;
import BatchProcessingRevertRequest = Definitions.BatchProcessingRevertRequest;



@Injectable()
export class ProcessingService {

  constructor(private httpClient: HttpClient) {}

  runBatchProcessing(albumId: string, request: BatchProcessingRequest): Observable<any> {
      return spinnable(
        this.httpClient.post<BatchProcessingRequest>(`/api/albums/${albumId}/batch-processing`, request)
      );
  }

  revertProcessing(albumId: string, imageUrls: string[]): Observable<any> {
    return spinnable(
      this.httpClient.post<BatchProcessingRevertRequest>(`/api/albums/${albumId}/batch-processing/revert`, {
        urls: imageUrls,
      })
    );
  }
}
