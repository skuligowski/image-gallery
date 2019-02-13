import { Attribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import '@unorm/lib/unorm.js';
import User = Definitions.User;


@Component({
  selector: 'app-user-create',
  templateUrl: 'user-create.component.html',
})
export class UserCreateComponent {

  display = false;
  username: string;
  password: string;
  retypedPassword: string;
  isAdmin: boolean = false;

  @Output()
  confirm: EventEmitter<UserCreateEvent> = new EventEmitter();

  @Input()
  modifyUsername: boolean;

  constructor(@Attribute('headerLabel') public headerLabel) {}

  open(user?: User): void {
    if (user) {
      this.username = user.username;
    } else {
      this.username = undefined;
      this.password = undefined;
      this.retypedPassword = undefined;
    }
    this.display = true;
  }

  save(): void {
    this.confirm.emit({
      username: this.username,
      password: this.password,
      admin: this.isAdmin,
      close: () => this.display = false
    });
  }

}

export interface UserCreateEvent {
  username: string;
  password: string;
  admin: boolean;
  close: Function;
}
