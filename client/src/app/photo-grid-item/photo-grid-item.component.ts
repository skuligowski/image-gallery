import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { PhotoGridComponent } from '../photo-grid/photo-grid.component';

@Component({
  selector: 'app-photo-grid-item',
  templateUrl: './photo-grid-item.component.html',
  styleUrls: ['./photo-grid-item.component.less']
})
export class PhotoGridItemComponent implements AfterViewInit {

  constructor(private photoGrid: PhotoGridComponent, private gridItemElement: ElementRef) { }

  ngAfterViewInit(): void {
    this.photoGrid.append(this.gridItemElement);
  }

}

