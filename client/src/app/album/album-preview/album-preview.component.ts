import { Component, Input } from '@angular/core';
import { CurrentAlbum } from '../../album.resolver';
import { AlbumSelectorService } from '../../common/album-selector/album-selector.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-album-preview',
  templateUrl: 'album-preview.component.html',
  styleUrls: ['album-preview.component.scss']
})
export class AlbumPreviewComponent {

  @Input()
  album: CurrentAlbum;

  constructor(private albumSelectorService: AlbumSelectorService,
              private router: Router,
              public authService: AuthService) { }

  chooseAlbum(): void {
    this.router.navigate([{outlets: { modal: 'album/select'}}], { queryParams: {albumId: this.album.id}});
  }
}
