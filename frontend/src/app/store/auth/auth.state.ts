import { DEFAULT_USER } from 'src/app/constants/auth';
import { User } from 'src/app/models/user';

export interface AuthState {
  isUserLoggedIn: boolean;
  loginTimestamp: number;
  user: User;
}

export const initialAuthState: AuthState = {
  isUserLoggedIn: false,
  user: DEFAULT_USER,
  loginTimestamp: 0,
};
