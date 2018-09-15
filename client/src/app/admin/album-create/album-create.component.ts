import { Component, DoCheck, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumsService } from '../../albums.service';
import Album = Definitions.Album;
import '@node_modules/unorm/lib/unorm.js';

@Component({
  selector: 'app-album-create',
  templateUrl: 'album-create.component.html',
})
export class AlbumCreateComponent implements OnInit, OnChanges, DoCheck {

  display = false;
  name: string;
  groups: string[] = [];

  customPermalink: string;
  autoPermalink: string;

  @Input()
  albums: Album[] = [];

  constructor(private router: Router, private albumsService: AlbumsService) {
  }

  open() {
    this.display = true;
  }

  createAlbum(): void {
    this.albumsService
      .createAlbum(this.name, this.customPermalink || this.autoPermalink, this.groups)
      .subscribe(() => {
        this.display = false;
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
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
    if (this.customPermalink !== undefined) {
      this.customPermalink = undefined;
    } else {
      this.customPermalink = this.autoPermalink || '';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }




}
