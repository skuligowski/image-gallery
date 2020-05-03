import { Component, DoCheck } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { tap } from 'rxjs/operators';
import Settings = Definitions.Settings;
import { FormGroup } from '@angular/forms';
import { SettingsValidators, SettingsValidatorsService } from './settings-validators.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements DoCheck {

  settings: Settings;
  settingsCopy: Settings = this.settings;
  settingsKeys: string[] = [];
  settingsChanged: boolean = false;
  settingsForm: FormGroup = new FormGroup({});

  constructor(private settingsService: SettingsService,
              private settingsValidators: SettingsValidatorsService) {
    this.reloadSettings();
  }

  reloadSettings(): void {
    this.settingsService.getSettings()
      .pipe(tap(settings => this.setSettings(settings)))
      .subscribe();
  }

  updateSettings(): void {
    this.settingsService.modifySettings(this.settings)
      .subscribe(() => this.setSettings(this.settings));
  }

  ngDoCheck(): void {
    if (this.settings) {
      this.settingsChanged = this.compareChanges(this.settingsCopy, this.settings, this.settingsKeys);
    }
  }

  onEditInit(event: any): void {
    const validators: SettingsValidators = this.settingsValidators.get(event.field);
    const control = this.settingsForm.controls[event.field];
    if (validators.validators || validators.asyncValidators) {
      setTimeout(() => {
        control.setValidators(validators.validators);
        control.setAsyncValidators(validators.asyncValidators);
      });
    }
  }

  onEditComplete(event): void {
    const control = this.settingsForm.controls[event.field];
    setTimeout(() => {
      control.clearValidators();
      control.clearAsyncValidators();
    });
  }

  private setSettings(settings: Settings): void {
    this.settingsCopy = {...settings};
    this.settings = settings;
    this.settingsKeys = Object.keys(settings);
  }

  private compareChanges(valueObject: any, srcObject: any, properties: string[]): boolean {
    return !!properties.find(key => valueObject[key] !== srcObject[key]);
  }
}
