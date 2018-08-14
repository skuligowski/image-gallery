import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Album = Definitions.Album;

@Component({
  selector: 'app-albums-manager',
  templateUrl: 'albums-manager.component.html'
})
export class AlbumsManagerComponent implements OnInit {

  albums: Album[];

  constructor(private router: Router, private route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.albums = data.albums;
    });
  }

  ngOnInit() {
  }

  navigateToGallery(): void {
      this.router.navigateByUrl('/');
  }
}
