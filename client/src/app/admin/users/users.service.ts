import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import User = Definitions.User;
import { spinnable } from '../../common/utils/spinnable';


@Injectable()
export class UsersService {


  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return spinnable(
      this.httpClient.get<User[]>('/api/users')
    );
  }

}
