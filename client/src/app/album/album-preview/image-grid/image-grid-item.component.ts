import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { ImageGridComponent } from './image-grid.component';

@Component({
  selector: 'app-image-grid-item',
  template: '<ng-content></ng-content>',
})
export class ImageGridItemComponent implements AfterViewInit, OnDestroy {

  constructor(private imageGrid: ImageGridComponent, private gridItemElement: ElementRef) { }

  ngAfterViewInit(): void {
    this.imageGrid.append(this.gridItemElement);
  }

  ngOnDestroy(): void {
    this.imageGrid.remove(this.gridItemElement);
  }


}

