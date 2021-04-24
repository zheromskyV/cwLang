import { Languages } from '../constants/languages.enum';
import { Roles } from '../constants/roles.enum';
import { Language } from './language';

export interface UserProfile {
  nativeLang: Languages;
  debt?: number;
  info?: string;
  rating?: number;
  languages: Language[];
}

export interface User {
  email: string;
  password: string;
  role: Roles;
  name: string;
  surname: string;
  birthday: Date;
  profile?: UserProfile;
}
