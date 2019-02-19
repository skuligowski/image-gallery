import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import Config = Definitions.Config;
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class ConfigGuard implements CanActivate {

  constructor(private configService: ConfigService) {}

  private config: Config;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.config ? of(true) : this.configService.loadConfig()
      .pipe(
        tap(config => this.config = config),
        map(() => true)
      );
  }
}
