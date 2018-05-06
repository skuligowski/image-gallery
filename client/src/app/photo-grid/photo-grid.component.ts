import { Component, ElementRef, OnInit } from '@angular/core';
import * as Masonry from 'masonry-layout';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.less']
})
export class PhotoGridComponent implements OnInit {

  private masonry: Masonry;

  constructor(private gridElement: ElementRef) {}

  ngOnInit() {
    this.masonry = new Masonry( this.gridElement.nativeElement, {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true,
      horizontalOrder: true,
    });
  }

  append(gridItemElement: ElementRef) {
    this.masonry.appended(gridItemElement.nativeElement);
  }

}
