import { Attribute, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import '@unorm/lib/unorm.js';
import Album = Definitions.Album;

@Component({
  selector: 'app-album-create',
  templateUrl: 'album-create.component.html',
  styleUrls: ['album-create.component.scss'],
})
export class AlbumCreateComponent implements OnInit, DoCheck {

  display = false;
  name: string;
  date: string;

  isCustomPermalink = false;
  customPermalink: string;
  autoPermalink: string;

  @Input()
  albums: Album[] = [];

  @Output()
  confirm: EventEmitter<AlbumCreateEvent> = new EventEmitter();

  constructor(@Attribute('headerLabel') public headerLabel) {}

  open(album?: Album): void {
    if (album) {
      this.name = album.name;
      this.date = album.date;
      this.autoPermalink = this.composePermalink();
      this.customPermalink = this.autoPermalink === album.permalink ? undefined : album.permalink;
      this.isCustomPermalink = !!this.customPermalink;
      this.autoPermalink = undefined;
    } else {
      this.name = undefined;
      this.date = undefined;
      this.customPermalink = undefined;
      this.autoPermalink = undefined;
    }
    this.display = true;
  }

  save(): void {
    this.confirm.emit({
      name: this.name,
      permalink: this.isCustomPermalink ? this.customPermalink : this.autoPermalink,
      date: this.date,
      close: () => this.display = false
    });
  }

  composePermalink(): string {
    const parts = []
    if (this.date) {
      const dateParts = this.date.split('-');
      if (dateParts.length === 3) {
        parts.push(...dateParts.slice(0, 2));
      }
    }
    if (this.name) {
      parts.push(this.normalize(this.name));
    }
    return parts.join('/');
  }

  normalize(text: string): string {
    return text.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace('ł', 'l')
      .replace('Ł', 'L')
      .replace(/[^a-zA-Z0-9\s\-]+/g, '')
      .replace(/[\s\-]+/g, '-')
      .toLowerCase();
  }

  ngOnInit() {

  }

  ngDoCheck(): void {
    this.autoPermalink = this.composePermalink();
  }

  togglePermalink(): void {
    if (!this.isCustomPermalink) {
      this.customPermalink = this.customPermalink || this.autoPermalink || '';
      this.isCustomPermalink = true;
    } else {
      this.isCustomPermalink = false;
    }
  }
}

export interface AlbumCreateEvent {
  name: string;
  permalink: string;
  date: string;
  close: Function;
}
