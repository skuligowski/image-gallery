import { Attribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: '[app-property-presenter]',
  templateUrl: 'property-presenter.component.html',
})
export class PropertyPresenterComponent {

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  valueFormControl: FormControl;

  @Input()
  value: any;

  @Input()
  formGroup: FormGroup;

  constructor(@Attribute('key') public key: string,
              @Attribute('type') public type: string,
              @Attribute('description') public description: string,
              @Attribute('name') public name: string) {

    this.valueFormControl = new FormControl('');
    this.valueFormControl.valueChanges.subscribe(changes => {
      if (changes !== this.value) {
        this.valueChange.emit(changes);
      }
    });
  }

  ngAfterViewInit(): void {
    this.formGroup.registerControl(this.key, this.valueFormControl);

    setTimeout(() => {
      this.valueFormControl.setValue(this.value);
    });
  }

}

