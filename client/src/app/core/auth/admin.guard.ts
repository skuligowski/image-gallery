import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { AuthGuard } from './auth.guard';
import { Observable } from 'rxjs';


@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private authGuard: AuthGuard, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authGuard.canActivate(route, state)
      .pipe(
        map(isAuthenticated => {
          const isUserAdmin = this.authService.isUserAdmin();
          if (isAuthenticated && !isUserAdmin) {
            this.router.navigateByUrl('/');
          }
          return isUserAdmin;
        })
      );
  }
}
