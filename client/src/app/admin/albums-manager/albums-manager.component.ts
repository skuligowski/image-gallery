import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;

@Component({
  selector: 'app-albums-manager',
  templateUrl: 'albums-manager.component.html'
})
export class AlbumsManagerComponent implements OnInit {

  albums: Album[];

  display: boolean = false;
  name: string;

  constructor(private router: Router, private route: ActivatedRoute) {
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
    this.display = false;
  }

  onRowSelect(row: any): void {
    console.log(row.data);
    this.router.navigateByUrl(`admin/albums/${row.data.id}`);
  }
}
