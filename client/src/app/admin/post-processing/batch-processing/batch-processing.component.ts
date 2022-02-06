import { Component, EventEmitter, Output } from '@angular/core';
import ProcessingResizeParams = Definitions.ProcessingResizeParams;

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
  resizeParams: ProcessingResizeParams = {width: 1024, height: 200, mode: 'RESIZE_BICUBIC', quality: 92};
  resizeEnabled: boolean = true;

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
    this.process.emit({ 
        resizeParams: this.resizeParams,
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
  close: Function;
}

export interface BatchProcessingRevertEvent {
  close: Function;
}