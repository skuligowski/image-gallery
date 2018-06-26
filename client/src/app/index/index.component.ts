import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {

  albums: Album[];

  constructor(private router: Router, private route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.albums = data['albums'];
      console.log(this.albums);
    });
  }

  ngOnInit() {
  }

  chooseAlbum(): void {
    this.router.navigate([{outlets: { modal: 'album/select'}}]);
  }

  getAlbumThumbUrl(album: Album) {
    return `url(${album.thumbUrl})`;
  }

  getRandomPhotoUrl(albums: Album[]) {
    return this.getAlbumThumbUrl(albums[1]);
  }
}
