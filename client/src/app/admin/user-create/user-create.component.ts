import { Attribute, Component, EventEmitter, OnInit, Output } from '@angular/core';
import '@unorm/lib/unorm.js';
import User = Definitions.User;




@Component({
  selector: 'app-user-create',
  templateUrl: 'user-create.component.html',
})
export class UserCreateComponent implements OnInit {

  display = false;
  name: string;

  @Output()
  confirm: EventEmitter<UserCreateEvent> = new EventEmitter();

  constructor(@Attribute('headerLabel') public headerLabel) {}

  open(user?: User): void {
    if (user) {
      this.name = user.username;
    } else {
      this.name = undefined;
    }
    this.display = true;
  }

  save(): void {
    this.confirm.emit({
      name: this.name,
      close: () => this.display = false
    });
  }


  ngOnInit() {

  }
}

export interface UserCreateEvent {
  name: string;
  close: Function;
}
