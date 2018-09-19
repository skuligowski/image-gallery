import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-library-manager',
  templateUrl: 'library-manager.component.html'
})
export class LibraryManagerComponent implements OnInit {


  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  navigateToGallery(): void {
    this.router.navigate(['/']);
  }

  navigateToAlbums(): void {
    this.router.navigate(['admin', 'albums']);
  }
}
