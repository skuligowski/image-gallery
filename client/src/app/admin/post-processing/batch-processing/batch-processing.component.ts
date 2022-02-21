import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { concatMap, delay, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { ProgressComponent } from '../../../common/progress/progress.component';
import { ProcessingService } from '../../services/processing.service';
import ProcessingResizeParams = Definitions.ProcessingResizeParams;
import ProcessingSharpenParams = Definitions.ProcessingSharpenParams;
import ProcessingExportParams = Definitions.ProcessingExportParams;
import Image = Definitions.Image;
import Album = Definitions.Album;

@Component({
  selector: 'app-batch-processing',
  templateUrl: 'batch-processing.component.html',
  styleUrls: ['batch-processing.component.scss'],
})
export class BatchProcessingComponent {

  display: boolean;

  resizeModes: any[] = [
      {code: 'RESIZE_NEAREST_NEIGHBOR', name: 'Nearest neighbor'},
      {code: 'RESIZE_BILINEAR', name: 'Bilinear'},
      {code: 'RESIZE_BICUBIC', name: 'Bicubic'},
      {code: 'RESIZE_HERMITE', name: 'Hermite'},
      {code: 'RESIZE_BEZIER', name: 'Bezier'},
  ];
  resizeParams: ProcessingResizeParams = {width: 1024, height: 768, mode: 'RESIZE_BICUBIC'};
  resizeEnabled: boolean = true;

  sharpenParams: ProcessingSharpenParams = {amount: 0.2};
  sharpenEnabled: boolean = true;

  exportParams: ProcessingExportParams = {quality: 92};
  exportEnabled: boolean = true;

  isProcessing: boolean = false;
  processingImage: string;

  @Input()
  images: Image[];

  @Input()
  album: Album;

  @Output()
  done: EventEmitter<BatchProcessingDoneEvent> = new EventEmitter();

  @Output()
  revert: EventEmitter<BatchProcessingRevertEvent> = new EventEmitter();

  @ViewChild('processingProgress', { static: true })
  processingProgress: ProgressComponent;

  constructor(private processingService: ProcessingService) {
    const params = (JSON.parse(localStorage.getItem('_ig_proc_params_snapshot')) as BatchProcessingParamsSnapshot);
    if (params) {
      this.resizeEnabled = params.resizeEnabled;
      this.sharpenEnabled = params.sharpenEnabled;
      this.resizeParams = params.resizeParams;
      this.sharpenParams = params.sharpenParams;
      this.exportParams = params.exportParams;
    }
  }

  open(): void {
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  doProcess(): void {
    localStorage.setItem('_ig_proc_params_snapshot', JSON.stringify({
      resizeEnabled: this.resizeEnabled,
      sharpenEnabled: this.sharpenEnabled,
      resizeParams: this.resizeParams,
      sharpenParams: this.sharpenParams,
      exportParams: this.exportParams,
    }));
    let subscription: Subscription = Subscription.EMPTY;  
    this.processingProgress.open(this.images.length)
      .then(() => subscription.unsubscribe());
    subscription = from(this.images.map((image, index) => ({ filename: image.filename, url: image.url, index })))
      .pipe(
        concatMap(image => {
          this.processingProgress.setDescription(`Processing ${image.filename}`);
          return this.processingService.runProcessing(
            this.album.id, 
            { 
              url: image.url,
              resize: this.resizeEnabled ? this.resizeParams : undefined,
              sharpen: this.sharpenEnabled ? this.sharpenParams: undefined,
              adjust: { exposure: 0 }, 
              export: this.exportParams,
            }
          ).pipe(tap(() => this.processingProgress.tick()))
        }),
        toArray(),
        delay(3000),
      ).subscribe(res => {
        this.processingProgress.close();
        this.done.emit({
          close: () => this.display = false
        });
      });
  }

  doRevert(): void {
    this.revert.emit({
        close: () => this.display = false
    });
  }

}

export interface BatchProcessingDoneEvent {
  close: Function;
}

export interface BatchProcessingRevertEvent {
  close: Function;
}

interface BatchProcessingParamsSnapshot {
  resizeEnabled: boolean;
  sharpenEnabled: boolean;
  resizeParams: ProcessingResizeParams;
  sharpenParams: ProcessingSharpenParams;
  exportParams: ProcessingExportParams;
}