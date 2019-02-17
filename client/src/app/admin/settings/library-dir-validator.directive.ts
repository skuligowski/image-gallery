import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Directive, forwardRef } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appLibraryDirValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => LibraryDirValidatorDirective),
      multi: true
    }
  ]
})
export class LibraryDirValidatorDirective implements AsyncValidator {
  constructor(private settingsService: SettingsService)  {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return !control.value ? of(null) : this.settingsService.validateLibraryDir(control.value)
      .pipe(map(response => {
        return response.valid ? null : {libraryDir: true};
      }));
  }
}
