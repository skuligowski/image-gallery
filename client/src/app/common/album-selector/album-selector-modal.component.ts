import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', group([
    query('.modal', [
      style({ opacity: 0.7, transform: 'translate3d(30%, 0, 0)' }),
      animate('.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 1, transform: 'translate3d(0, 0, 0)'}))
    ]),
    query('.overlay', [
      style({ opacity: 0 }),
      animate('.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 0.6 }))
    ])
  ])),
  transition(':leave', group([
    query('.modal', [
      style({ opacity: 0.7, transform: 'translate3d(0, 0, 0)' }),
      animate('.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 0, transform: 'translate3d(10%, 0, 0)'}))
    ]),
    query('.overlay', [
      style({ opacity: 0.6 }),
      animate('.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 0 }))
    ])
  ]))
]);

@Component({
  selector: 'app-album-selector-modal',
  templateUrl: './album-selector-modal.component.html',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class AlbumSelectorModalComponent {

  @HostBinding('class.opened')
  opened: boolean;

  constructor(private router: Router) {

  }

  close(): void {
    this.router.navigate([{outlets: {modal: null}}]);
  }
}
