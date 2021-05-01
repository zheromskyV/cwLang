import { Action, createReducer, on } from '@ngrx/store';

import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.setUserLoggedIn, (state, { isUserLoggedIn }) => ({
    ...state,
    isUserLoggedIn,
  })),
  on(AuthActions.setUserInfo, (state, { userInfo }) => ({
    ...state,
    userInfo,
  })),
  on(AuthActions.setLoginTimestamp, (state, { loginTimestamp }) => ({
    ...state,
    loginTimestamp,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
