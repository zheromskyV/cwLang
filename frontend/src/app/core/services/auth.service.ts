import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CREATE_USER, LOGIN, UPDATE_USER } from 'src/app/api/auth';
import { User, UserInfo } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apollo: Apollo) {}

  login(email: string, password: string): Observable<UserInfo> {
    return this.apollo
      .mutate<{ login: UserInfo }>({
        mutation: LOGIN,
        variables: { email, password },
      })
      .pipe(
        map(({ data }) => data?.login),
        catchError(() => of(null))
      );
  }

  signUp(user: User): Observable<UserInfo> {
    return this.apollo
      .mutate<{ createUser: User }>({
        mutation: CREATE_USER,
        variables: { user },
      })
      .pipe(
        map(({ data }) => data?.createUser),
        catchError(() => of(null))
      );
  }

  updateUser(user: User): Observable<UserInfo> {
    return this.apollo
      .mutate<{ updateUser: User }>({
        mutation: UPDATE_USER,
        variables: {
          id: user._id,
          user: _.omit(user, ['_id', '__typename']),
        },
      })
      .pipe(
        map(({ data }) => data?.updateUser),
        catchError(() => of(null))
      );
  }
}
