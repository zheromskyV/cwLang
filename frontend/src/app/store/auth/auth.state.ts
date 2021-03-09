import { Roles } from 'src/app/constants/roles.enum';

export interface AuthState {
  isUserLoggedIn: boolean;
  userInfo: UserInfo;
  loginTimestamp: number;
}

// TODO: replace with real user data model
export interface UserInfo {
  role?: Roles;
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
}

export const initialAuthState: AuthState = {
  isUserLoggedIn: false,
  userInfo: {},
  loginTimestamp: 0,
};
