import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;
import { AlbumsService } from '../../albums.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-albums-manager',
  templateUrl: 'albums-manager.component.html'
})
export class AlbumsManagerComponent implements OnInit {

  albums: Album[];

  constructor(private router: Router, private route: ActivatedRoute, private albumsService: AlbumsService) {
    route.data.subscribe(data => {
      this.albums = data.albums;
    });
  }

  ngOnInit() {
  }

  onRowSelect(row: any): void {
    this.router.navigateByUrl(`admin/albums/${row.data.id}`);
  }
}
