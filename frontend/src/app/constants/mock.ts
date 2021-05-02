import { Language } from '../models/language';
import { User } from '../models/user';
import { Languages } from './languages.enum';
import { Roles } from './roles.enum';

export const mockUser: User = {
  _id: 'id12345678',
  email: 'mock@email.com',
  password: 'password',
  role: Roles.Admin,
  name: 'name',
  surname: 'surname',
  birthday: Date.now(),
  nativeLanguage: Languages.Ru,
};

export const mockLanguages: Language[] = [
  { name: Languages.Be, value: 10 },
  { name: Languages.Ch, value: 20 },
  { name: Languages.En, value: 30 },
  { name: Languages.Fr, value: 40 },
  { name: Languages.Ge, value: 50 },
  { name: Languages.It, value: 60 },
  { name: Languages.Ru, value: 70 },
  { name: Languages.Sp, value: 80 },
  { name: Languages.Sw, value: 90 },
];

export const mockStudent: User = {
  ...mockUser,
  role: Roles.Student,
  profile: {
    languages: [...mockLanguages],
    debt: 200,
    discount: 15,
  },
};

export const mockTeacher: User = {
  ...mockUser,
  role: Roles.Teacher,
  profile: {
    languages: [...mockLanguages],
    info: 'Obviously, I am the best teacher you can find!',
  },
};
