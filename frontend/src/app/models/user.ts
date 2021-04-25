import { Languages } from '../constants/languages.enum';
import { Roles } from '../constants/roles.enum';
import { Language } from './language';

export interface Profile {
  nativeLanguage: Languages;
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
  birthday: number;
  profile?: Profile;
}

export type UserInfo = User | null | undefined;
