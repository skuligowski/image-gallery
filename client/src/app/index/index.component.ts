import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {

  lastModifiedAlbums: Album[];

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService) {
    route.data.subscribe(data => {
      this.lastModifiedAlbums = (data['albums'] as Album[])
        .sort((albumA, albumB) => albumB.lastModified.localeCompare(albumA.lastModified));
    });
  }

  ngOnInit(): void {
  }

  chooseAlbum(): void {
    this.router.navigate([{outlets: { modal: 'album/select'}}]);
  }

  navigateToAdmin(): void {
    this.router.navigateByUrl(`admin/albums`);
  }

  getAlbumThumbUrl(album: Album): string {
    return album.thumbUrl ? `url(${album.thumbUrl})` : undefined;
  }

  navigateToAlbum(album: Album): void{
    this.router.navigateByUrl(`albums/${album.permalink}`);
  }

  getWelcomeImageUrl(): string {
    return this.getAlbumThumbUrl(this.lastModifiedAlbums[1]);
  }
}
