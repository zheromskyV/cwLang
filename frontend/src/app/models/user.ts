import { Languages } from '../constants/languages.enum';
import { Roles } from '../constants/roles.enum';
import { Language } from './language';

export interface Profile {
  debt?: number;
  discount?: number;
  info?: string;
  rating?: number;
  languages: Language[];
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  role: Roles;
  name: string;
  surname: string;
  birthday: number;
  nativeLanguage: Languages;
  profile?: Profile;
}

export type Users = User[];

export type UserInfo = User | null | undefined;
