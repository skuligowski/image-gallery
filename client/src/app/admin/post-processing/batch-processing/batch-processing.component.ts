import { Component, EventEmitter, Output } from '@angular/core';
import ProcessingResizeParams = Definitions.ProcessingResizeParams;
import ProcessingSharpenParams = Definitions.ProcessingSharpenParams;

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
  resizeParams: ProcessingResizeParams = (JSON.parse(localStorage.getItem('processing_resize')) as ProcessingResizeParams) 
    || {width: 1024, height: 768, mode: 'RESIZE_BICUBIC', quality: 92};
  resizeEnabled: boolean = true;

  sharpenParams: ProcessingSharpenParams = (JSON.parse(localStorage.getItem('processing_sharpen')) as ProcessingSharpenParams) 
  || {amount: 0.2};

  @Output()
  process: EventEmitter<BatchProcessingEvent> = new EventEmitter();

  @Output()
  revert: EventEmitter<BatchProcessingRevertEvent> = new EventEmitter();

  constructor() {}

  open(): void {
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  doProcess(): void {
    localStorage.setItem('processing_resize', JSON.stringify(this.resizeParams));
    localStorage.setItem('processing_sharpen', JSON.stringify(this.sharpenParams));
    this.process.emit({ 
        resizeParams: this.resizeParams,
        sharpenParams: this.sharpenParams,
        close: () => this.display = false
    });
  }

  doRevert(): void {
    this.revert.emit({
        close: () => this.display = false
    });
  }

}

export interface BatchProcessingEvent {
  resizeParams?: ProcessingResizeParams;
  sharpenParams?: ProcessingSharpenParams;
  close: Function;
}

export interface BatchProcessingRevertEvent {
  close: Function;
}