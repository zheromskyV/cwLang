import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaymentService } from 'src/app/payment/services/payment.service';
import * as PaymentActions from './payment.actions';
import * as UiActions from '../ui/ui.actions';

@Injectable()
export class PaymentEffects {
  constructor(private readonly actions$: Actions, private readonly paymentService: PaymentService) {}

  makePayment$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.makePayment),
      switchMap(({ user, paymentAmount }) => this.paymentService.makePayment(user, paymentAmount)),
      switchMap(() => [UiActions.setGeneralSuccess({ isGeneralSuccess: true })])
    )
  );

  addDiscount$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.addDiscount),
      switchMap(({ user, discount }) => this.paymentService.addDiscount(user, discount)),
      switchMap(() => [UiActions.setGeneralSuccess({ isGeneralSuccess: true })])
    )
  );
}
