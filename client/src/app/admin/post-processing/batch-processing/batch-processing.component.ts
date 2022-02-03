import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-batch-processing',
  templateUrl: 'batch-processing.component.html',
  styleUrls: ['batch-processing.component.scss'],
})
export class BatchProcessingComponent {

  display: boolean;
    resizeWidth: number;
    resizeHeight: number;
    resizeModes: any[] = [
        {code: 'RESIZE_NEAREST_NEIGHBOR', name: 'Nearest neighbor'},
        {code: 'RESIZE_BILINEAR', name: 'Bilinear'},
        {code: 'RESIZE_BICUBIC', name: 'Bicubic'},
        {code: 'RESIZE_HERMITE', name: 'Hermite'},
        {code: 'RESIZE_BEZIER', name: 'Bezier'},
    ];
    resizeMode: string = 'RESIZE_BICUBIC';
    resizeEnabled: boolean = true;

  @Output()
  process: EventEmitter<BatchProcessingEvent> = new EventEmitter();

  constructor() {}

  open(): void {
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  doProcess(): void {
    this.process.emit({ 
        close: () => this.display = false
    });
  }

}

export interface BatchProcessingEvent {
    close: Function;
  }