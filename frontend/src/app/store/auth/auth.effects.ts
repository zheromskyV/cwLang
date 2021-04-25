import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { SESSION_EXPIRATION_TIME } from '../../constants/auth';
import { RootState } from '../root.state';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.selector';
import * as UiActions from '../ui/ui.actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootState>,
    private readonly authService: AuthService
  ) {}

  initSession$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initSession),
      switchMap(() => [
        AuthActions.setLoginTimestamp({ loginTimestamp: Date.now() }),
        AuthActions.setUserLoggedIn({ isUserLoggedIn: true }),
        UiActions.showNavigation(),
      ])
    )
  );

  checkSession$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkSession),
      withLatestFrom(this.store.select(fromAuth.getLoginTimestamp)),
      switchMap(([_, loginTimestamp]) => (this.isSessionValid(loginTimestamp) ? [] : [AuthActions.logOut()]))
    )
  );

  logIn$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      switchMap(({ email, password }) => this.authService.login(email, password)),
      switchMap((userInfo) =>
        _.compact([AuthActions.setUserInfo({ userInfo }), _.isEmpty(userInfo) ? null : AuthActions.initSession()])
      )
    )
  );

  logOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() => [UiActions.hideNavigation()])
    )
  );

  signUp$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ user }) => this.authService.signUp(user)),
      switchMap((userInfo) =>
        _.compact([
          _.isEmpty(userInfo) ? null : AuthActions.logIn({ email: userInfo!.email, password: userInfo!.password }),
        ])
      )
    )
  );

  private isSessionValid(loginTimestamp: number): boolean {
    return loginTimestamp + SESSION_EXPIRATION_TIME < Date.now();
  }
}
