export interface UiState {
  isNavigationShown: boolean;
  isLoginError: boolean;
  isRegistrationError: boolean;
  isUpdateUserError: boolean;
  isUpdateUserSuccess: boolean;
  isCoursesError: boolean;
  isWordsError: boolean;
  isGeneralError: boolean;
  isGeneralSuccess: boolean;
}

export const initialUiState: UiState = {
  isNavigationShown: false,
  isLoginError: false,
  isRegistrationError: false,
  isUpdateUserError: false,
  isUpdateUserSuccess: false,
  isCoursesError: false,
  isWordsError: false,
  isGeneralError: false,
  isGeneralSuccess: false,
};
