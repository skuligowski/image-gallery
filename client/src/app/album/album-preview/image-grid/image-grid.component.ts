import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, NgZone, OnInit, QueryList } from '@angular/core';
import * as Masonry from 'masonry-layout';
import { ImageGridItemComponent } from './image-grid-item.component';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGridComponent implements OnInit, AfterViewInit {

  @ContentChildren(ImageGridItemComponent, {read: ElementRef})
  gridItems: QueryList<ElementRef>;

  private masonry: Masonry;
  private lastGridItemElements: HTMLElement[];

  constructor(private gridElement: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    this.masonry = new Masonry( this.gridElement.nativeElement, {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true,
      horizontalOrder: true,
      initLayout: true
    });
  }

  ngAfterViewInit(): void {
    this.gridItems.changes.subscribe((items: QueryList<ElementRef>) => {
      this.zone.runOutsideAngular(() => {
        if (this.lastGridItemElements) {
          this.masonry.remove(this.lastGridItemElements);
          this.masonry.layout();
        }
        this.lastGridItemElements = items.map(item => item.nativeElement);
        this.masonry.appended(this.lastGridItemElements);
      });
    });
    this.gridItems.notifyOnChanges();
  }
}
