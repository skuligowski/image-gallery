import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Photo = Definitions.Photo;

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.less']
})
export class PhotoComponent implements OnInit {


  @Input()
  photo: Photo;

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  previous: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
