import { Component, EventEmitter, Output } from '@angular/core';
import '@unorm/lib/unorm.js';

@Component({
  selector: 'app-library-directory-create',
  templateUrl: 'library-directory-create.component.html',
})
export class LibraryDirectoryCreateComponent {

  display = false;
  name: string;

  @Output()
  confirm: EventEmitter<LibraryDirectoryCreateEvent> = new EventEmitter();

  constructor() {}

  open(): void {
    this.name = undefined;
    this.display = true;
  }

  save(): void {
    this.confirm.emit({
      name: this.name,
      close: () => this.display = false
    });
  }

}

export interface LibraryDirectoryCreateEvent {
  name: string;
  close: Function;
}
