import { Component, HostBinding, OnInit } from '@angular/core';
import { AlbumSelectorService } from './album-selector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-selector',
  templateUrl: './album-selector.component.html',
})
export class AlbumSelectorComponent {

  @HostBinding('class.opened')
  opened: boolean;

  constructor(private albumSelectorService: AlbumSelectorService, private router: Router) {

  }

  close(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }
}
