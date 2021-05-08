export interface UiState {
  isNavigationShown: boolean;
  isLoginError: boolean;
  isRegistrationError: boolean;
  isUpdateUserError: boolean;
  isUpdateUserSuccess: boolean;
  isCoursesError: boolean;
  isWordsError: boolean;
}

export const initialUiState: UiState = {
  isNavigationShown: false,
  isLoginError: false,
  isRegistrationError: false,
  isUpdateUserError: false,
  isUpdateUserSuccess: false,
  isCoursesError: false,
  isWordsError: false,
};
