import { Attribute, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: '[app-property-presenter]',
  templateUrl: 'property-presenter.component.html'
})
export class PropertyPresenterComponent {


  @Input()
  value: any;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  constructor(@Attribute('key') public key: string,
              @Attribute('type') public type: string,
              @Attribute('description') public description: string,
              @Attribute('name') public name: string) {}

}

