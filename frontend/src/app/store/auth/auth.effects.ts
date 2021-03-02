import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select } from '@ngrx/store';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { SESSION_EXPIRATION_TIME } from 'src/app/constants/auth';
import { RootState } from '../root.state';
import { StoreFeature } from '../store.enum';
import * as AuthActions from './auth.actions';
import { UserInfo } from './auth.state';
import _ from 'lodash';

@Injectable()
export class AuthEffects {
  constructor(private readonly actions$: Actions, private readonly store$: Store<RootState>) {}

  initSession$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initSession),
      switchMap(() => [
        AuthActions.setLoginTimestamp({ loginTimestamp: Date.now() }),
        AuthActions.setUserLoggedIn({ isUserLoggedIn: true }),
      ])
    )
  );

  checkSession$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkSession),
      withLatestFrom(this.store$.pipe(select(StoreFeature.Auth))),
      switchMap(([_, store]) => [
        AuthActions.setUserLoggedIn({ isUserLoggedIn: this.isSessionValid(store.loginTimestamp) }),
      ])
    )
  );

  logIn$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      switchMap((action) => {
        // AuthService returns user data if success and {} if not
        return of({} as UserInfo);
      }),
      switchMap((userInfo) =>
        _.compact([AuthActions.setUserInfo({ userInfo }), _.isEmpty(userInfo) ? null : AuthActions.initSession()])
      )
    )
  );

  logOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() => [
        AuthActions.setUserLoggedIn({ isUserLoggedIn: false }),
        AuthActions.setUserInfo({ userInfo: {} }),
        AuthActions.setLoginTimestamp({ loginTimestamp: 0 }),
      ])
    )
  );

  register$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) => {
        // AuthService returns user data if success and {} if not
        return of({} as UserInfo);
      }),
      switchMap((userInfo) =>
        _.compact([
          _.isEmpty(userInfo) ? null : AuthActions.logIn({ email: userInfo.email!, password: userInfo.password! }),
        ])
      )
    )
  );

  private isSessionValid(loginTimestamp: number): boolean {
    return loginTimestamp + SESSION_EXPIRATION_TIME < Date.now();
  }
}
