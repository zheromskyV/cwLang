import { CommonModel } from '../models/common';

export const dictionary: CommonModel = {
  // navigation
  cwLang: 'CWLang',
  myProfile: 'Мой профиль',
  courses: 'Курсы',
  groups: 'Группы',
  teachers: 'Преподаватели',
  students: 'Студенты',
  discounts: 'Скидки',
  payment: 'Оплата',
  analytics: 'Аналитика',
  messages: 'Сообщения',
  schedule: 'Расписание',
  testing: 'Тестирование',
  game: 'Игра',
  connect: 'Связь',
  logOut: 'Выйти',

  // auth
  auth: 'Авторизация',
  login: 'Логин (почта)',
  password: 'Пароль',
  signIn: 'Войти',
  signUp: 'Зарегистрироваться',
  loginError: 'Ошибка входа. Неправильный логин или пароль.',

  // registration
  registration: 'Регистрация',
  back: 'Назад',
  name: 'Имя',
  surname: 'Фамилия',
  role: 'Роль',
  admin: 'Администратор',
  student: 'Студент',
  teacher: 'Преподаватель',
  languages: 'Языки',
  en: 'Английский',
  ru: 'Русский',
  be: 'Белорусский',
  ge: 'Немецкий',
  fr: 'Французский',
  sp: 'Испанский',
  ch: 'Китайский',
  sw: 'Шведский',
  it: 'Итальянский',
  birthday: 'Дата рождения',
  nativeLang: 'Родной язык',
  about: 'О себе',
  registrationError: 'Ошибка регистрации',

  // profile
  status: 'Статус',
  paid: 'Оплачено',
  debt: 'Долг',
  discount: 'Скидка',

  // not-found
  pageNotFound: 'Страница не найдена',
  goToHome: 'Вернуться домой',
};
