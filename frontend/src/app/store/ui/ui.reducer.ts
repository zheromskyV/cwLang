import { Action, createReducer, on } from '@ngrx/store';

import { UiState, initialUiState } from './ui.state';
import * as UiActions from './ui.actions';

const reducer = createReducer(
  initialUiState,
  on(UiActions.showNavigation, (state) => ({
    ...state,
    isNavigationShown: true,
  })),
  on(UiActions.hideNavigation, (state) => ({
    ...state,
    isNavigationShown: false,
  })),
  on(UiActions.setLoginError, (state, { isLoginError }) => ({
    ...state,
    isLoginError,
  })),
  on(UiActions.setRegistrationError, (state, { isRegistrationError }) => ({
    ...state,
    isRegistrationError,
  })),
  on(UiActions.setUpdateUserError, (state, { isUpdateUserError }) => ({
    ...state,
    isUpdateUserError,
  })),
  on(UiActions.setUpdateUserSuccess, (state, { isUpdateUserSuccess }) => ({
    ...state,
    isUpdateUserSuccess,
  }))
);

export function uiReducer(state: UiState | undefined, action: Action) {
  return reducer(state, action);
}
