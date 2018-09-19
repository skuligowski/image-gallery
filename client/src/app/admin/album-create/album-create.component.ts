import { Attribute, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import '@unorm/lib/unorm.js';
import Album = Definitions.Album;

@Component({
  selector: 'app-album-create',
  templateUrl: 'album-create.component.html',
})
export class AlbumCreateComponent implements OnInit, DoCheck {

  display = false;
  name: string;
  groups: string[] = [];

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
      this.groups = album.tree || [];
      this.autoPermalink = this.composePermalink();
      this.customPermalink = this.autoPermalink === album.permalink ? undefined : album.permalink;
      this.isCustomPermalink = !!this.customPermalink;
      this.autoPermalink = undefined;
    } else {
      this.name = undefined;
      this.groups = [];
      this.customPermalink = undefined;
      this.autoPermalink = undefined;
    }
    this.display = true;
  }

  save(): void {
    this.confirm.emit({
      name: this.name,
      permalink: this.isCustomPermalink ? this.customPermalink : this.autoPermalink,
      groups: this.groups,
      close: () => this.display = false
    });
  }

  composePermalink(): string {
    const parts = this.groups.reduce((parts, group) => parts.concat(this.normalize(group)), []);
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
  groups: string[];
  close: Function;
}
