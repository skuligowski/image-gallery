import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Image = Definitions.Image;

@Component({
  selector: 'app-album-details',
  templateUrl: 'album-details.component.html'
})
export class AlbumDetailsComponent implements OnInit {

  images: Image[];

  constructor(private route: ActivatedRoute) {
    route.data.subscribe((data: any) => {
      this.images = data.album.images;
    });
  }

  ngOnInit() {
  }
}
