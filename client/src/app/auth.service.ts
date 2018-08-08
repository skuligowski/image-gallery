import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthService {

  private redirectUrl: string;

  constructor(private router: Router) {
  }

  authenticationHandler<T>(redirectUrl: string): (observable: Observable<T>) => Observable<boolean> {
    return (observable: Observable<T>) => {
      return observable.pipe(
        map(() => true), catchError((e: HttpErrorResponse) => {
          if (e.status === 401) {
            this.redirectUrl = redirectUrl;
            this.router.navigateByUrl('/login');
          }
          return of(false);
        })
      );
    };
  }

  popRedirectUrl(fallbackRedirectUrl: string): string {
    const redirectUrl = this.redirectUrl || fallbackRedirectUrl;
    this.redirectUrl = null;
    return redirectUrl;
  }
}
