import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { UiState } from './ui.state';

const rootSelector = createFeatureSelector<UiState>(StoreFeature.Ui);

export const getNavigationShown = createSelector(rootSelector, (state: UiState): boolean => state.isNavigationShown);

export const getLoginError = createSelector(rootSelector, (state: UiState): boolean => state.isLoginError);

export const getRegistrationError = createSelector(
  rootSelector,
  (state: UiState): boolean => state.isRegistrationError
);
