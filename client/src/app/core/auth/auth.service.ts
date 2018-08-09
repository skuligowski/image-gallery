import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  login(username: string, password: string): Observable<void> {
    return spinnable(
      this.httpClient.post<User>(`/api/login`, { username, password })
    ).pipe(
      tap(user => {
        this.user = user;
        this.router.navigateByUrl(this.popRedirectUrl('/'));
      }),
      switchMap(() => EMPTY));
  }

  checkCredentials(redirectUrl: string): Observable<boolean> {
    return this.user ? of(true) : spinnable(
      this.httpClient.get<User>('/api/user').pipe(
        tap( user => this.user = user),
        this.authenticationHandler(redirectUrl)
      )
    );
  }

  isUserAdmin(): boolean {
    return this.user && this.user.admin;
  }
}
