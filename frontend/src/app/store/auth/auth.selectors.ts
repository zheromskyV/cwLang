import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Roles } from 'src/app/constants/roles.enum';
import { Profile, UserInfo } from 'src/app/models/user';
import { StoreFeature } from '../store.enum';
import { AuthState } from './auth.state';

const rootSelector = createFeatureSelector<AuthState>(StoreFeature.Auth);

export const getUserLoggedIn = createSelector(rootSelector, (state: AuthState): boolean => state.isUserLoggedIn);

export const getUserInfo = createSelector(rootSelector, (state: AuthState): UserInfo => state.userInfo);

export const getLoginTimestamp = createSelector(rootSelector, (state: AuthState): number => state.loginTimestamp);

export const getUserRole = createSelector(
  getUserInfo,
  (userInfo: UserInfo): Roles => userInfo?.role ?? Roles.Undefined
);

export const getUserProfile = createSelector(
  getUserInfo,
  (userInfo: UserInfo): Profile | undefined => userInfo?.profile
);
