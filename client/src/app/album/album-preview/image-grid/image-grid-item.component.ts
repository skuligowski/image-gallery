import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ImageGridComponent } from './image-grid.component';

@Component({
  selector: 'app-image-grid-item',
  template: '<ng-content></ng-content>',
})
export class ImageGridItemComponent implements AfterViewInit {

  constructor(private imageGrid: ImageGridComponent, private gridItemElement: ElementRef) { }

  ngAfterViewInit(): void {
    this.imageGrid.append(this.gridItemElement);
  }

}

