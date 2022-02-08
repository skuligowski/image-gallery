import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: 'header-navigation.component.html',
  styleUrls: ['header-navigation.component.scss'],
})
export class HeaderNavigationComponent {

  constructor(private router: Router,
              public authService: AuthService) {}

  @Input()
  back?: string;

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
