import { createAction, props } from '@ngrx/store';

export const showNavigation = createAction('[UI] SHOW_NAVIGATION');

export const hideNavigation = createAction('[UI] HIDE_NAVIGATION');

export const setLoginError = createAction('[UI] SET_LOGIN_ERROR', props<{ isLoginError: boolean }>());

export const setRegistrationError = createAction(
  '[UI] SET_REGISTRATION_ERROR',
  props<{ isRegistrationError: boolean }>()
);

export const setUpdateUserError = createAction('[UI] SET_UPDATE_USER_ERROR', props<{ isUpdateUserError: boolean }>());

export const setUpdateUserSuccess = createAction(
  '[UI] SET_UPDATE_USER_SUCCESS',
  props<{ isUpdateUserSuccess: boolean }>()
);
