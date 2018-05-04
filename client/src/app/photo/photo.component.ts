import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentPhoto } from '../album.resolver';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.less']
})
export class PhotoComponent implements OnInit {


  @Input()
  photo: CurrentPhoto;

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  previous: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  close: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
