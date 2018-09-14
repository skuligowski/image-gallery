import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumsService } from '../../albums.service';
import Album = Definitions.Album;

@Component({
  selector: 'app-album-create',
  templateUrl: 'album-create.component.html',
})
export class AlbumCreateComponent implements OnInit {

  display = false;
  name: string;
  permalink: string;

  @Input()
  albums: Album[] = [];

  groups: string[];

  constructor(private router: Router, private albumsService: AlbumsService, private renderer: Renderer2) {
  }

  open() {
    this.display = true;
  }

  createAlbum(): void {
    this.albumsService
      .createAlbum(this.name, this.permalink, this.groups)
      .subscribe(() => {
        this.display = false;
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  ngOnInit() {

  }




}
