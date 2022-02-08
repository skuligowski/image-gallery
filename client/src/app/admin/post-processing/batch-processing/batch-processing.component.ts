import { Component, EventEmitter, Output } from '@angular/core';
import ProcessingResizeParams = Definitions.ProcessingResizeParams;
import ProcessingSharpenParams = Definitions.ProcessingSharpenParams;
import ProcessingExportParams = Definitions.ProcessingExportParams;

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

  @Output()
  process: EventEmitter<BatchProcessingEvent> = new EventEmitter();

  @Output()
  revert: EventEmitter<BatchProcessingRevertEvent> = new EventEmitter();

  constructor() {
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
    this.process.emit({ 
        resize: this.resizeEnabled ? this.resizeParams : undefined,
        sharpen: this.sharpenEnabled ? this.sharpenParams: undefined,
        export: this.exportParams,
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
  resize?: ProcessingResizeParams;
  sharpen?: ProcessingSharpenParams;
  export: ProcessingExportParams;
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