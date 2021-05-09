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

export const getUpdateUserError = createSelector(rootSelector, (state: UiState): boolean => state.isUpdateUserError);

export const getUpdateUserSuccess = createSelector(
  rootSelector,
  (state: UiState): boolean => state.isUpdateUserSuccess
);

export const getCoursesError = createSelector(rootSelector, (state: UiState): boolean => state.isCoursesError);

export const getWordsError = createSelector(rootSelector, (state: UiState): boolean => state.isWordsError);

export const getGeneralError = createSelector(rootSelector, (state: UiState): boolean => state.isGeneralError);

export const getGeneralSuccess = createSelector(rootSelector, (state: UiState): boolean => state.isGeneralSuccess);
