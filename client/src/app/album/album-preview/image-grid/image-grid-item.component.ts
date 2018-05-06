import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ImageGridComponent } from './image-grid.component';

@Component({
  selector: 'app-image-grid-item',
  template: '<ng-content></ng-content>',
})
export class ImageGridItemComponent implements AfterViewInit {

  constructor(private photoGrid: ImageGridComponent, private gridItemElement: ElementRef) { }

  ngAfterViewInit(): void {
    this.photoGrid.append(this.gridItemElement);
  }

}

