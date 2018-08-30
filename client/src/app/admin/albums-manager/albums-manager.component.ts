import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;
import { AlbumsService } from '../../albums.service';

@Component({
  selector: 'app-albums-manager',
  templateUrl: 'albums-manager.component.html'
})
export class AlbumsManagerComponent implements OnInit {

  albums: Album[];

  display = false;
  name: string;
  permalink: string;
  tree: string;

  constructor(private router: Router, private route: ActivatedRoute, private albumsService: AlbumsService) {
    route.data.subscribe(data => {
      this.albums = data.albums;
    });
  }

  openCreateAlbumDialog() {
    this.display = true;
  }

  ngOnInit() {
  }

  createAlbum(): void {
    this.albumsService
      .createAlbum(this.name, this.permalink, this.tree.split(','))
      .subscribe(() => {
        this.display = false;
      });
  }

  onRowSelect(row: any): void {
    console.log(row.data);
    this.router.navigateByUrl(`admin/albums/${row.data.id}`);
  }
}
