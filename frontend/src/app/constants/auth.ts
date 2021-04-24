import { Language } from '../models/language';
import { User } from '../models/user';
import { dictionary } from './dictionary';
import { Languages } from './languages.enum';
import { Roles } from './roles.enum';

export const SESSION_EXPIRATION_TIME = 3600; // 1 hour

export const DEFAULT_LANGUAGES: Language[] = [
  { name: Languages.Be, value: 0 },
  { name: Languages.Ch, value: 0 },
  { name: Languages.En, value: 0 },
  { name: Languages.Fr, value: 0 },
  { name: Languages.Ge, value: 0 },
  { name: Languages.It, value: 0 },
  { name: Languages.Ru, value: 0 },
  { name: Languages.Sp, value: 0 },
  { name: Languages.Sw, value: 0 },
];

export const ROLE_OPTIONS = [
  { value: Roles.Admin, label: dictionary[Roles.Admin] },
  { value: Roles.Teacher, label: dictionary[Roles.Teacher] },
  { value: Roles.Student, label: dictionary[Roles.Student] },
];

export const LANGUAGE_OPTIONS = [
  { value: Languages.Be, label: dictionary[Languages.Be] },
  { value: Languages.Ch, label: dictionary[Languages.Ch] },
  { value: Languages.En, label: dictionary[Languages.En] },
  { value: Languages.Fr, label: dictionary[Languages.Fr] },
  { value: Languages.Ge, label: dictionary[Languages.Ge] },
  { value: Languages.It, label: dictionary[Languages.It] },
  { value: Languages.Ru, label: dictionary[Languages.Ru] },
  { value: Languages.Sp, label: dictionary[Languages.Sp] },
  { value: Languages.Sw, label: dictionary[Languages.Sw] },
];

export const DEFAULT_USER: User = {
  email: '',
  password: '',
  name: '',
  surname: '',
  birthday: new Date(),
  role: Roles.Undefined,
  profile: {
    nativeLang: Languages.UN,
    languages: DEFAULT_LANGUAGES,
  },
};
