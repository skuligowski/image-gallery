import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import User = Definitions.User;

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})

export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private router: Router, private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  navigateToGallery(): void {
    this.router.navigate(['/']);
  }

  navigateToAlbums(): void {
    this.router.navigate(['admin/albums']);
  }

  onRowSelect(row: any): void {

  }
}
