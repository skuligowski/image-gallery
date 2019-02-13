import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import User = Definitions.User;
import { spinnable } from '../../common/utils/spinnable';
import UserCreateRequest = Definitions.UserCreateRequest;


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

  removeUser(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return spinnable(
      this.httpClient.delete('/api/users', { params })
    );
  }
}
