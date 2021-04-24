import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LOGIN, SIGN_UP } from 'src/app/api/auth';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apollo: Apollo) {}

  login(email: string, password: string): Observable<User | null> {
    return this.apollo
      .mutate<{ user: User }>({
        mutation: LOGIN,
        variables: { email, password },
      })
      .pipe(
        map(({ data }) => data?.user || null),
        catchError(() => of(null))
      );
  }

  signUp(user: User): Observable<User | null> {
    return this.apollo
      .mutate<{ user: User }>({
        mutation: SIGN_UP,
        variables: { user },
      })
      .pipe(
        map(({ data }) => data?.user || null),
        catchError(() => of(null))
      );
  }
}
