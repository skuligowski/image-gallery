import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Image = Definitions.Image;
import Album = Definitions.Album;

@Component({
  selector: 'app-album-details',
  templateUrl: 'album-details.component.html'
})
export class AlbumDetailsComponent implements OnInit {

  album: Album;
  images: Image[];

  constructor(private route: ActivatedRoute) {
    route.data.subscribe((data: any) => {
      this.album = data.album;
      this.images = data.album.images;
    });
  }

  ngOnInit() {
  }
}
