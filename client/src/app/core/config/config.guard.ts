import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ConfigService } from './config.service';
import Config = Definitions.Config;
import { of, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Injectable()
export class ConfigGuard implements CanActivate {

  constructor(private configService: ConfigService, private title: Title) {}

  private config: Config;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.config ? of(true) : this.configService.loadConfig()
      .pipe(
        tap(config => this.config = config),
        tap(config => this.title.setTitle(config.galleryName)),
        map(() => true)
      );
  }
}
