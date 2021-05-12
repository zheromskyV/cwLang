import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SEND_DEBT_NOTIFICATION, SEND_QUESTION_TO_ADMIN } from 'src/app/api/notification';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private readonly apollo: Apollo) {}

  sendQuestion(user: User, message: string): Observable<unknown> {
    return this.apollo
      .mutate({
        mutation: SEND_QUESTION_TO_ADMIN,
        variables: { userId: user._id, message },
      })
      .pipe(
        map(() => null),
        catchError(() => of(null))
      );
  }

  sendDebtNotification(user: User): Observable<unknown> {
    return this.apollo
      .mutate({
        mutation: SEND_DEBT_NOTIFICATION,
        variables: { userId: user._id },
      })
      .pipe(
        map(() => null),
        catchError(() => of(null))
      );
  }
}
