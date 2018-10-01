import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;
import { AlbumsService } from '../../albums.service';
import { AlbumCreateEvent } from '../album-create/album-create.component';

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

  onCreateAlbum(event: AlbumCreateEvent): void {
    this.albumsService
      .createAlbum(event.name, event.permalink, event.groups)
      .subscribe(() => {
        event.close();
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  navigateToGallery(): void {
    this.router.navigate(['/']);
  }

}
