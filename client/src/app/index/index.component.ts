import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {

  lastModifiedAlbums: Album[];

  constructor(private router: Router, private route: ActivatedRoute) {
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

  getAlbumThumbUrl(album: Album): string {
    return `url(${album.thumbUrl})`;
  }

  navigateToAlbum(album: Album): void{
    this.router.navigateByUrl(`albums/${album.permalink}`);
  }

  getWelcomeImageUrl(): string {
    return this.getAlbumThumbUrl(this.lastModifiedAlbums[1]);
  }
}
