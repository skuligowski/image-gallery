import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumsService } from '../../albums.service';

@Component({
  selector: 'app-album-create',
  templateUrl: 'album-create.component.html'
})
export class AlbumCreateComponent implements OnInit {

  display = false;
  name: string;
  permalink: string;
  tree: string;

  constructor(private router: Router, private albumsService: AlbumsService) {
  }

  open() {
    this.display = true;
  }

  createAlbum(): void {
    this.albumsService
      .createAlbum(this.name, this.permalink, this.tree.split(','))
      .subscribe(() => {
        this.display = false;
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  ngOnInit() {
  }
}
