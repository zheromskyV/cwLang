import { UserInfo } from 'src/app/models/user';

export interface AuthState {
  isUserLoggedIn: boolean;
  loginTimestamp: number;
  userInfo: UserInfo;
}

export const initialAuthState: AuthState = {
  isUserLoggedIn: false,
  userInfo: null,
  loginTimestamp: 0,
};
