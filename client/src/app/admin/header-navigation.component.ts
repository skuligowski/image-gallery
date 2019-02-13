import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-navigation',
  templateUrl: 'header-navigation.component.html'
})
export class HeaderNavigationComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  navigateToAlbums(): void {
    this.router.navigate(['admin/albums']);
  }

  navigateToGallery(): void {
    this.router.navigate(['/']);
  }

  navigateToUsers(): void {
    this.router.navigate(['admin/users']);
  }
}
