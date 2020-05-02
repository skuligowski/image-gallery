import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { spinnable } from '../../common/utils/spinnable';
import User = Definitions.User;

@Injectable()
export class AuthService {

  private user: User;
  private redirectUrl: string;

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  authenticationHandler<T>(redirectUrl: string): (observable: Observable<T>) => Observable<boolean> {
    return (observable: Observable<T>) => {
      return observable.pipe(
        map(() => true), catchError(e => {
          this.redirectUrl = redirectUrl;
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

  login(username: string = '', password: string = ''): Observable<void> {
    return spinnable(
      this.httpClient.post<User>(`/api/login`, { username, password })
    ).pipe(
      tap(user => {
        this.user = user;
        this.router.navigateByUrl(this.popRedirectUrl('/'));
      }),
      switchMap(() => EMPTY));
  }

  logout(): void {
    spinnable(
      this.httpClient.post<void>('/api/logout', {})
    ).subscribe(() => {
      this.user = undefined;
      this.router.navigateByUrl('/login');
    });
  }

  checkCredentials(redirectUrl: string): Observable<boolean> {
    return this.user ? of(true) : spinnable(
      this.httpClient.get<User>('/api/user').pipe(
        tap( user => this.user = user),
        this.authenticationHandler(redirectUrl)
      )
    );
  }

  isLogged(): boolean {
    return this.user && !this.user.guest;
  }

  isUserAdmin(): boolean {
    return this.user && this.user.admin;
  }
}
