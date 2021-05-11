import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ADD_DISCOUNT, MAKE_PAYMENT } from 'src/app/api/payment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private readonly apollo: Apollo) {}

  makePayment(user: User, paymentAmount: number): Observable<unknown> {
    return this.apollo
      .mutate({
        mutation: MAKE_PAYMENT,
        variables: { userId: user._id, paymentAmount },
      })
      .pipe(
        map(() => null),
        catchError(() => of(null))
      );
  }

  addDiscount(user: User, discount: number): Observable<unknown> {
    return this.apollo
      .mutate({
        mutation: ADD_DISCOUNT,
        variables: { userId: user._id, discount },
      })
      .pipe(
        map(() => null),
        catchError(() => of(null))
      );
  }
}
