import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { PhotoGridComponent } from './photo-grid.component';

@Component({
  selector: 'app-photo-grid-item',
  template: '<ng-content></ng-content>',
})
export class PhotoGridItemComponent implements AfterViewInit {

  constructor(private photoGrid: PhotoGridComponent, private gridItemElement: ElementRef) { }

  ngAfterViewInit(): void {
    this.photoGrid.append(this.gridItemElement);
  }

}

