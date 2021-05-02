export interface UiState {
  isNavigationShown: boolean;
  isLoginError: boolean;
  isRegistrationError: boolean;
  isUpdateUserError: boolean;
}

export const initialUiState: UiState = {
  isNavigationShown: false,
  isLoginError: false,
  isRegistrationError: false,
  isUpdateUserError: false,
};
