import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


@Directive({
  selector: '[appSamePassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: SamePasswordDirective, multi: true}]
})
export class SamePasswordDirective implements Validator {

  onChangeFn: () => void = () => {};


  private _password: string;

  @Input()
  set password(password: string) {
   this._password = password;
   this.onChangeFn();
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChangeFn = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const pass1Value = this._password;
    const pass2Value = control.value;
    if (pass1Value && pass2Value && pass1Value !== pass2Value) {
      return {samePassword: true};
    }
    return null;
  }
}
