import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentAlbum, CurrentImage } from '../album.resolver';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.less']
})
export class AlbumComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  album: CurrentAlbum;
  image: CurrentImage;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.album = data.album;
      this.image = this.album.currentImage;
      console.log(this.image);
    });
  }

  next(): void {
    if (this.image.nextImage) {
      this.router.navigate(['albums'].concat(this.album.permalink.split('/')).concat(this.image.nextImage.filename));
    }
  }

  previous(): void {
    if (this.image.previousImage) {
      this.router.navigate(['albums'].concat(this.album.permalink.split('/')).concat(this.image.previousImage.filename));
    }
  }

  close(): void {
    this.router.navigate(['albums'].concat(this.album.permalink.split('/')));
  }
}
