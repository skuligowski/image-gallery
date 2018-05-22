import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentImage } from '../../album.resolver';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
})
export class ImagePreviewComponent {


  @Input()
  image: CurrentImage;

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  previous: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  close: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

}
