import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import SettingsResponse = Definitions.SettingsResponse;

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

  settings: SettingsResponse = {authentication: false, libraryDir: ''};

  constructor(private settingsService: SettingsService) {
    this.reloadSettings();
  }

  ngOnInit() {
  }

  reloadSettings(): void {
    this.settingsService.getSettings()
      .subscribe(settings => {
        this.settings = settings;
        console.log(this.settings);
      });
  }
}
