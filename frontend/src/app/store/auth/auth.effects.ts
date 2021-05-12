import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { SESSION_EXPIRATION_TIME } from '../../constants/auth';
import { RootState } from '../root.state';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.selectors';
import * as UiActions from '../ui/ui.actions';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootState>,
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService
  ) {}

  initSession$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initSession),
      tap(() => this.navigationService.navigateToHomePage()),
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
      switchMap((userInfo) => [
        AuthActions.setUserInfo({ userInfo }),
        _.isEmpty(userInfo) ? UiActions.setLoginError({ isLoginError: true }) : AuthActions.initSession(),
      ])
    )
  );

  logOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => this.navigationService.navigateToLoginPage()),
      switchMap(() => [
        UiActions.hideNavigation(),
        AuthActions.setUserLoggedIn({ isUserLoggedIn: false }),
        AuthActions.setUserInfo({ userInfo: null }),
        AuthActions.setLoginTimestamp({ loginTimestamp: 0 }),
      ])
    )
  );

  signUp$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ user }) => this.authService.signUp(user)),
      switchMap((userInfo) =>
        _.isEmpty(userInfo)
          ? [UiActions.setRegistrationError({ isRegistrationError: true })]
          : [AuthActions.setUserInfo({ userInfo }), AuthActions.initSession()]
      )
    )
  );

  updateUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      switchMap(({ user }) => this.authService.updateUser(user)),
      switchMap((userInfo) =>
        _.isEmpty(userInfo)
          ? [UiActions.setRegistrationError({ isRegistrationError: true })]
          : [AuthActions.setUserInfo({ userInfo }), UiActions.setUpdateUserSuccess({ isUpdateUserSuccess: true })]
      )
    )
  );

  private isSessionValid(loginTimestamp: number): boolean {
    return loginTimestamp + SESSION_EXPIRATION_TIME > Date.now();
  }
}
