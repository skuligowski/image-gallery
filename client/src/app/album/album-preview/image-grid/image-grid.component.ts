import { Component, ElementRef, OnInit } from '@angular/core';
import * as Masonry from 'masonry-layout';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.less']
})
export class ImageGridComponent implements OnInit {

  private masonry: Masonry;
  private layout$: Subject<void> = new Subject();

  constructor(private gridElement: ElementRef) {}

  ngOnInit() {
    this.masonry = new Masonry( this.gridElement.nativeElement, {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true,
      horizontalOrder: true,
    });

    this.layout$
      .pipe(debounceTime(0))
      .subscribe(() => this.masonry.layout());
  }

  append(gridItemElement: ElementRef): void {
    this.masonry.appended(gridItemElement.nativeElement);
  }

  remove(gridItemElement: ElementRef): void {
    this.masonry.remove(gridItemElement.nativeElement);
    this.layout$.next();
  }
}
