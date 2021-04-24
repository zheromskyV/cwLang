import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from 'src/app/models/user';
import { StoreFeature } from '../store.enum';
import { AuthState } from './auth.state';

const rootSelector = createFeatureSelector<AuthState>(StoreFeature.Auth);

export const getUserLoggedIn = createSelector(rootSelector, (state: AuthState): boolean => state.isUserLoggedIn);

export const getUser = createSelector(rootSelector, (state: AuthState): User => state.user);

export const getLoginTimestamp = createSelector(rootSelector, (state: AuthState): number => state.loginTimestamp);
