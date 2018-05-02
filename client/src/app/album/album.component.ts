import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Photo = Definitions.Photo;

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.less']
})
export class AlbumComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  photos: Photo[] = [
    {url: 'assets/some_1.jpg', filename: 'some_1.jpg'},
    {url: 'assets/some_2.jpg', filename: 'some_2.jpg'}
  ];

  currentPhoto: Photo = this.photos[0];

  ngOnInit() {
    this.route.params.subscribe(a => {
      console.log(a);
      console.log('data', this.route.snapshot.data);
    });
  }

  next(): void {
    this.router.navigate(['album', '2018', 'best-ever', 'some_2.jpg']);
  }

  previous(): void {
    this.router.navigate(['album', '2018', 'best-ever', 'some_1.jpg']);
  }
}
