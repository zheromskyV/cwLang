import { createAction, props } from '@ngrx/store';

export const showNavigation = createAction('[UI] SHOW_NAVIGATION');

export const hideNavigation = createAction('[UI] HIDE_NAVIGATION');

export const setLoginError = createAction('[UI] SET_LOGIN_ERROR', props<{ isLoginError: boolean }>());

export const setRegistrationError = createAction(
  '[UI] SET_REGISTRATION_ERROR',
  props<{ isRegistrationError: boolean }>()
);
