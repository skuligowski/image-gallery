import { Component, Input, OnInit } from '@angular/core';
import { CurrentAlbum } from '../../album.resolver';
import { AlbumSelectorService } from '../../common/album-selector/album-selector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.less']
})
export class AlbumPreviewComponent implements OnInit {

  @Input()
  album: CurrentAlbum;

  constructor(private albumSelectorService: AlbumSelectorService, private router: Router) { }

  ngOnInit() {
  }

  chooseAlbum(): void {
    this.router.navigate([{outlets: { modal: 'album/select'}}]);
  }
}
