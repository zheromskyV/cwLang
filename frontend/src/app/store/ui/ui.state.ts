export interface UiState {
  isNavigationShown: boolean;
  isLoginError: boolean;
  isRegistrationError: boolean;
}

export const initialUiState: UiState = {
  isNavigationShown: false,
  isLoginError: false,
  isRegistrationError: false,
};
