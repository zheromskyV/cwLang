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
  }))
);

export function uiReducer(state: UiState | undefined, action: Action) {
  return reducer(state, action);
}
