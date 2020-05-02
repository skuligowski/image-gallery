import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;
import { AuthService } from '../core/auth/auth.service';
import { ConfigService } from '../core/config/config.service';

@Component({
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.scss']
})
export class IndexComponent implements OnInit {

  lastModifiedAlbums: Album[] = [];
  albumsCount = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public authService: AuthService,
              public config: ConfigService) {

    route.data.subscribe(data => {
      const albums = data['albums'] as Album[];
      this.lastModifiedAlbums = albums.sort((albumA, albumB) => albumB.lastModified.localeCompare(albumA.lastModified))
        .slice(0, config.dashboardTilesCount);
      this.albumsCount = albums.length;
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
    return album && album.thumbUrl ? `url(/library${album.thumbUrl})` : undefined;
  }

  navigateToAlbum(album: Album): void {
    this.router.navigateByUrl(`albums/${album.permalink}`);
  }

  getWelcomeImageUrl(): string {
    return `url(/library${this.config.dashboardImageUrl})`;
  }
}
