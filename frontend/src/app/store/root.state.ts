import { AuthState } from './auth/auth.state';
import { StoreFeature } from './store.enum';

export interface RootState {
  [StoreFeature.Auth]: AuthState;
}
