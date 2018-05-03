import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentAlbum } from '../album.resolver';
import Photo = Definitions.Photo;

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.less']
})
export class AlbumComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  album: CurrentAlbum;
  photo: Photo;

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.album = data.album;
      this.photo = data.album.photo;
    });
  }

  next(): void {
    this.router.navigate(['albums', '2018', 'best-ever', 'some_2.jpg']);
  }

  previous(): void {
    this.router.navigate(['albums', '2018', 'best-ever', 'some_1.jpg']);
  }

  close(): void {
    this.router.navigate(['albums'].concat(this.album.permalink.split('/')));
  }
}
