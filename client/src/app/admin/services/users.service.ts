import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import User = Definitions.User;
import { spinnable } from '../../common/utils/spinnable';
import UserCreateRequest = Definitions.UserCreateRequest;
import UserPasswordChangeRequest = Definitions.UserPasswordChangeRequest;


@Injectable()
export class UsersService {


  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return spinnable(
      this.httpClient.get<User[]>('/api/users')
    );
  }

  createUser(user: UserCreateRequest): Observable<any> {
    return spinnable(
      this.httpClient.post<UserCreateRequest>('/api/users', user)
    );
  }

  changePassword(user: UserPasswordChangeRequest): Observable<any> {
    return spinnable(
      this.httpClient.patch<UserPasswordChangeRequest>('/api/users/password', {username: user.username, password: user.password})
    );
  }

  removeUser(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return spinnable(
      this.httpClient.delete('/api/users', { params })
    );
  }
}
