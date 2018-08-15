import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: 'admin-header.component.html'
})
export class AdminHeaderComponent {
  constructor(private router: Router) {
  }
]
  navigateToGallery(): void {
    this.router.navigateByUrl('/');
  }
}
