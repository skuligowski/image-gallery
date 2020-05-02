import { AfterViewInit, Component } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { spinnerEvents$ } from '../utils/spinnable';

const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', group([
    query('.spinner', [
      style({ opacity: 0 }),
      animate('0.7s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 1 }))
    ]),
    query('.overlay', [
      style({ opacity: 0 }),
      animate('1s 10ms cubic-bezier(.3,.98,.11,1.0)', style({ opacity: 1 }))
    ]),
  ])),
  transition(':leave', group([
    query('.spinner', [
      style({ opacity: 1 }),
      animate('.7s ease', style({ opacity: 0 }))
    ]),
    query('.overlay', [
      style({ opacity: 1 }),
      animate('.7s ease', style({ opacity: 0 }))
    ]),
  ]))
]);


@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.scss'],
  animations: [ fadeInAnimation ],
})
export class SpinnerComponent implements AfterViewInit {

  active = false;

  ngAfterViewInit(): void {
    spinnerEvents$.subscribe(e => this.active = !!e);
  }

}
