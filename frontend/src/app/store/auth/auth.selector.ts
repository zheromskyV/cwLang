import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { StoreFeature } from '../store.enum';
import { AuthState, UserInfo } from './auth.state';

const rootSelector = createFeatureSelector<AuthState>(StoreFeature.Auth);

export const getUserLoggedIn = createSelector(rootSelector, (state: AuthState): boolean => state.isUserLoggedIn);

export const getUserInfo = createSelector(rootSelector, (state: AuthState): UserInfo => state.userInfo);

export const getLoginTimestamp = createSelector(rootSelector, (state: AuthState): number => state.loginTimestamp);
