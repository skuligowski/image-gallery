import { Component, DoCheck } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { tap } from 'rxjs/operators';
import Settings = Definitions.Settings;

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements DoCheck {

  settings: Settings = {galleryName: '', authentication: false, libraryDir: ''};
  settingsCopy: Settings = this.settings;
  settingsChanged: boolean = false;

  constructor(private settingsService: SettingsService) {
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
    this.settingsChanged = this.compareChanges(this.settingsCopy, this.settings, ['galleryName', 'authentication', 'libraryDir']);
  }

  private setSettings(settings: Settings): void {
    this.settingsCopy = {...settings};
    this.settings = settings;
  }

  private compareChanges(valueObject: any, srcObject: any, properties: string[]): boolean {
    return !!properties.find(key => valueObject[key] !== srcObject[key]);
  }
}
