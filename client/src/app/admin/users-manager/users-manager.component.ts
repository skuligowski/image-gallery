import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import User = Definitions.User;
import { UserCreateEvent } from '../user-create/user-create.component';

@Component({
  selector: 'app-users-manager',
  templateUrl: 'users-manager.component.html'
})
export class UsersManagerComponent implements OnInit {

  users: User[] = [];

  constructor(private router: Router, private usersService: UsersService) {
  }

  ngOnInit() {
    this.reloadUsers();
  }

  reloadUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  onCreateNewUser(userCreateEvent: UserCreateEvent): void {
    this.usersService
      .createUser({username: userCreateEvent.username, password: userCreateEvent.password, admin: userCreateEvent.admin})
      .subscribe(() => {
        userCreateEvent.close();
        this.reloadUsers();
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
