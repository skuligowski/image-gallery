import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentAlbum, CurrentPhoto } from '../album.resolver';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.less']
})
export class AlbumComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  album: CurrentAlbum;
  photo: CurrentPhoto;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.album = data.album;
      this.photo = this.album.currentPhoto;
      console.log(this.photo);
    });
  }

  next(): void {
    if (this.photo.nextPhoto) {
      this.router.navigate(['albums'].concat(this.album.permalink.split('/')).concat(this.photo.nextPhoto.filename));
    }
  }

  previous(): void {
    if (this.photo.previousPhoto) {
      this.router.navigate(['albums'].concat(this.album.permalink.split('/')).concat(this.photo.previousPhoto.filename));
    }
  }

  close(): void {
    this.router.navigate(['albums'].concat(this.album.permalink.split('/')));
  }
}
