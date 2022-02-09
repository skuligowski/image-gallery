import { Component, EventEmitter, Input, Output } from '@angular/core';
import { from } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
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
  processingProgress: number = 0;
  processingImage: string;

  @Input()
  images: Image[];

  @Input()
  album: Album;

  @Output()
  done: EventEmitter<BatchProcessDoneEvent> = new EventEmitter();

  @Output()
  revert: EventEmitter<BatchProcessingRevertEvent> = new EventEmitter();

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
    this.processingProgress = 0;
    this.isProcessing = false;
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
    this.isProcessing = true;
    from(this.images.map((image, index) => ({ filename: image.filename, url: image.url, index })))
      .pipe(
        concatMap(image => {
          setTimeout(() => {
            this.processingImage = image.filename;
            this.processingProgress = Math.round((image.index + 1) / (this.images.length + 1) * 100);
          }, 0);
          return this.processingService.runProcessing(
            this.album.id, 
            { 
              url: image.url,
              resize: this.resizeEnabled ? this.resizeParams : undefined,
              sharpen: this.sharpenEnabled ? this.sharpenParams: undefined,
              export: this.exportParams,
            }
          ).pipe(map(res => image));
        }),
      ).subscribe(res => {
        
      }, (e) => console.log(), () => {
        setTimeout(() => { this.processingProgress = 100; }, 0);
        setTimeout(() => this.done.emit({
          close: () => this.display = false
        }), 2000);
      });
  }

  doRevert(): void {
    this.revert.emit({
        close: () => this.display = false
    });
  }

}

export interface BatchProcessDoneEvent {
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