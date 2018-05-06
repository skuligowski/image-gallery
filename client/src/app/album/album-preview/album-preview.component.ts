import { Component, Input, OnInit } from '@angular/core';
import { CurrentAlbum } from '../../album.resolver';

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.less']
})
export class AlbumPreviewComponent implements OnInit {

  @Input()
  album: CurrentAlbum;

  constructor() { }

  ngOnInit() {
  }

}
