import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LOGIN, SIGN_UP } from 'src/app/api/auth';
import { User, UserInfo } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apollo: Apollo) {}

  login(email: string, password: string): Observable<UserInfo> {
    return this.apollo
      .mutate<{ user: User }>({
        mutation: LOGIN,
        variables: { email, password },
      })
      .pipe(
        map(({ data }) => data?.user),
        catchError(() => of(null))
      );
  }

  signUp(user: User): Observable<UserInfo> {
    return this.apollo
      .mutate<{ user: User }>({
        mutation: SIGN_UP,
        variables: { user },
      })
      .pipe(
        map(({ data }) => data?.user),
        catchError(() => of(null))
      );
  }
}
