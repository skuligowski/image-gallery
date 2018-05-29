import { Component, ViewContainerRef } from '@angular/core';
import { AlbumsService } from './albums.service';
import { SplashService } from './common/splash/splash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';

  constructor(private albumsService: AlbumsService, private container: ViewContainerRef, private splashService: SplashService) {
    splashService.attachSplash((container.element.nativeElement as HTMLElement).nextElementSibling);
  }
}
