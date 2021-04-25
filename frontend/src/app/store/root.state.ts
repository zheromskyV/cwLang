import { StoreFeature } from './store.enum';
import { AuthState } from './auth/auth.state';
import { UiState } from './ui/ui.state';

export interface RootState {
  [StoreFeature.Auth]: AuthState;
  [StoreFeature.Ui]: UiState;
}
