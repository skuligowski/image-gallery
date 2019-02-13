import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import User = Definitions.User;
import { UserCreateEvent } from '../user-create/user-create.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-users-manager',
  templateUrl: 'users-manager.component.html'
})
export class UsersManagerComponent implements OnInit {

  users: User[] = [];

  constructor(private router: Router,
              private usersService: UsersService,
              private confirmationService: ConfirmationService) {}

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

  onChangePassword(userCreateEvent: UserCreateEvent): void {
    this.usersService
      .changePassword({username: userCreateEvent.username, password: userCreateEvent.password})
      .subscribe(() => {
        userCreateEvent.close();
        this.reloadUsers();
      });
  }

  removeUser(user: User): void {
    this.confirmationService.confirm({
      message: null,
      accept: () => {
        this.usersService.removeUser(user.username)
          .subscribe(() => this.reloadUsers());
      }
    });
  }

  onRowSelect(row: any): void {

  }
}
