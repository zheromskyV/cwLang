import { Action, createReducer, on } from '@ngrx/store';

import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.setUserLoggedIn, (state, { isUserLoggedIn }) => ({
    ...state,
    isUserLoggedIn,
  })),
  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    isUserLoggedIn: initialAuthState.isUserLoggedIn,
    user: initialAuthState.user,
    loginTimestamp: initialAuthState.loginTimestamp,
  })),
  on(AuthActions.setLoginTimestamp, (state, { loginTimestamp }) => ({
    ...state,
    loginTimestamp,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
