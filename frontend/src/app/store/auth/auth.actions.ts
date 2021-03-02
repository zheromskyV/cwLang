import { createAction, props } from '@ngrx/store';
import { UserInfo } from './auth.state';

export const setUserLoggedIn = createAction('[AUTH] SET_USER_LOGGED_IN', props<{ isUserLoggedIn: boolean }>());

export const setUserInfo = createAction('[AUTH] SET_USER_INFO', props<{ userInfo: UserInfo }>());

export const setLoginTimestamp = createAction('[AUTH] SET_LOGIN_TIMESTAMP', props<{ loginTimestamp: number }>());

export const initSession = createAction('[AUTH] INIT_SESSION');

export const checkSession = createAction('[AUTH] CHECK_SESSION');

export const logIn = createAction('[AUTH] LOG_IN', props<{ email: string; password: string }>());

export const logOut = createAction('[AUTH] LOG_OUT');

export const register = createAction('[AUTH] REGISTER', props<{ userInfo: UserInfo }>());
