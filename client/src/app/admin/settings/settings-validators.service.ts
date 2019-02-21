import { AbstractControl, AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SettingsValidatorsService {
  constructor(private settingsService: SettingsService)  {}

  libraryDir(): SettingsValidators {
    return {
      validators: Validators.required,
      asyncValidators: (control: AbstractControl) => {
        return this.settingsService.validateLibraryDir(control.value)
          .pipe(map(response => {
            return response.valid ? null : {libraryDir: true};
          }));
      }
    }
  }

  galleryName(): SettingsValidators {
    return {
      validators: Validators.required
    }
  }

  get(key: string): SettingsValidators {
    if (this[key]) {
      return this[key]();
    } else {
      return {};
    }
  }
}

export interface SettingsValidators {
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
}
