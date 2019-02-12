import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
}
