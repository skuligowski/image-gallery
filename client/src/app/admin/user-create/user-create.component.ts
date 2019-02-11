import { Attribute, Component, EventEmitter, OnInit, Output } from '@angular/core';
import '@unorm/lib/unorm.js';
import User = Definitions.User;
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-user-create',
  templateUrl: 'user-create.component.html',
})
export class UserCreateComponent implements OnInit {

  display = false;
  username: string;
  password: string;
  retypedPassword: string;

  @Output()
  confirm: EventEmitter<UserCreateEvent> = new EventEmitter();

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
      close: () => this.display = false
    });
  }

  samePasswords(form: NgForm, password1Field: string, password2Field): boolean {
    const pass1Value = form.controls[password1Field].value;
    const pass2Value = form.controls[password2Field].value;
    if (pass1Value && pass2Value && pass1Value !== pass2Value) {
      return true;
    }
    return false;
  }


  ngOnInit() {

  }
}

export interface UserCreateEvent {
  username: string;
  close: Function;
}
