import { Component, Input, ViewChild } from '@angular/core';
import { CurrentAlbum } from '../../album.resolver';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AnchorsDirective } from '../../common/anchors/anchors.directive';

@Component({
  selector: 'app-album-preview',
  templateUrl: 'album-preview.component.html',
  styleUrls: ['album-preview.component.scss']
})
export class AlbumPreviewComponent {

  @Input()
  set album(album: CurrentAlbum) {
    if ((!this.currentAlbum || this.currentAlbum.id !== album.id) && this.anchors) {
      this.anchors.scrollToTop();
    } else if (!album.currentImage && this.anchors) {
      this.anchors.scrollTo(this.currentAlbum.currentImage.filename);
    }
    this.currentAlbum = album;
  }
  get album(): CurrentAlbum {
    return this.currentAlbum;
  }
  private currentAlbum: CurrentAlbum;

  @ViewChild(AnchorsDirective)
  anchors: AnchorsDirective;

  constructor(private router: Router,
              public authService: AuthService) { }

  chooseAlbum(): void {
    this.router.navigate([{outlets: { modal: 'album/select'}}], { queryParams: {albumId: this.album.id}});
  }

}
