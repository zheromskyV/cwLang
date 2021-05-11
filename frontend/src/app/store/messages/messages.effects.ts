import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from '../root.state';
import { MessagesService } from 'src/app/messages/services/messages.service';
import { User } from 'src/app/models/user';
import * as MessagesActions from './messages.actions';
import * as UiActions from '../ui/ui.actions';
import * as fromAuth from '../auth/auth.selectors';

@Injectable()
export class MessagesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootState>,
    private readonly messagesService: MessagesService
  ) {}

  sendQuestion$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.sendQuestion),
      withLatestFrom(this.store.select(fromAuth.getUserInfo)),
      switchMap(([{ message }, userInfo]) => this.messagesService.sendQuestion(userInfo as User, message)),
      switchMap(() => [UiActions.setGeneralSuccess({ isGeneralSuccess: true })])
    )
  );

  sendDebtNotification$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.sendDebtNotification),
      switchMap(({ user }) => this.messagesService.sendDebtNotification(user)),
      switchMap(() => [UiActions.setGeneralSuccess({ isGeneralSuccess: true })])
    )
  );
}
