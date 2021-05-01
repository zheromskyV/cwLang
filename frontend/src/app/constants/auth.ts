import { dictionary } from './dictionary';
import { Languages } from './languages.enum';
import { Roles } from './roles.enum';

export const SESSION_EXPIRATION_TIME = 3600000; // 1 hour

export const MIN_PASSWORD_LENGTH = 8;
export const MIN_NAME_LENGTH = 2;
export const MIN_ABOUT_LENGTH = 10;

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
