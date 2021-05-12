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
  learning: 'Изучение',
  game: 'Игра',
  connect: 'Связь',
  logOut: 'Выйти',

  // auth
  auth: 'Авторизация',
  login: 'Логин (почта)',
  password: 'Пароль',
  signIn: 'Войти',
  signUp: 'Зарегистрироваться',

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

  // profile
  status: 'Статус',
  paid: 'Оплачено',
  debt: 'Долг',
  discount: 'Скидка',
  save: 'Сохранить',
  cancel: 'Отменить',
  edit: 'Редактировать',

  // courses
  course: 'Курс',
  courseTitle: 'Название',
  courseInitialLang: 'Родной язык',
  courseTargetLang: 'Язык курса',
  courseLevel: 'Уровень',
  coursePrice: 'Цена',
  courseInfo: 'Описание',
  add: 'Добавить',

  // words
  wordsInitial: 'Слово',
  wordsTarget: 'Перевод',
  wordsInitialLang: 'Язык слова',
  wordsTargetLang: 'Язык перевода',
  searchByWord: 'Поиск по слову',
  availableItems: 'Доступные',
  selectedItems: 'Выбранные',
  loadWords: 'Загрузить слова',
  yourWords: 'Ваши слова',
  favoriteWords: 'Избранные',
  addWord: 'Добавить слово к курсу',
  downloadFile: 'Скачать избранные слова',
  wordsReport: 'Избранные слова',

  // students
  age: 'Возраст',
  email: 'Почта',
  clearFilters: 'Очистить фильтры',
  search: 'Поиск',
  noStudentsYet: 'Студентов еще нет',

  // teacher
  rating: 'Рейтинг',
  rateTeacher: 'Оцените преподавателя',
  rateMessage: 'Ваш комментарий',

  // groups
  group: 'Группа',
  groupTitle: 'Название',
  groupSchedule: 'Расписание',
  groupTeacher: 'Преподаватель',
  selectStudents: 'Выберите студентов',
  selectTeacher: 'Выберите преподавателя',
  selectCourse: 'Выберите курс',
  selectScheduleTitle: 'Название',
  selectDaysOfWeek: 'Выберите дни недели',
  selectStartTime: 'Выберите время начала',
  selectEndTime: 'Выберите время окончания',
  selectStartRecur: 'Выберите дату начала',
  selectEndRecur: 'Выберите дату окончания',

  // analytics
  coursesAnalytics: 'Курсы',
  langsAnalytics: 'Языки',
  marksAnalytics: 'Оценки',
  initialCoursesLangsAnalytics: 'Языки студентов',
  targetCoursesLangsAnalytics: 'Языки изучения',
  studentsLangsAnalytics: 'Интересы в языках студентов',
  teachersLangsAnalytics: 'Интересы в языках преподавателей',
  generalMarks: 'Общее распредление оценок студентов',
  loadAnalytics: 'Загрузить данные',
  selectGroup: 'Выберите группу',
  myMarks: 'Мои оценки',

  // testing
  testingMark: 'Оценка:',
  testingComment: 'Комментарий:',
  selectStudent: 'Выберите студента',
  testingReport: 'Отчет по успеваемости',
  downloadReport: 'Скачать отчет по успеваемости',

  // messages
  askQuestionGiveFeedback: 'Задайте свой вопрос или оставьте комментарий',
  sendDebtNotification: 'Отправить напоминание о задолженности',
  send: 'Отправить',

  // discounts
  discount1: 'Занимается вместе с другом',
  discount2: 'Занимается вместе с семьей',
  discount3: 'Занимается больше трех лет',
  finalDiscount: 'Итоговоя скидка',

  // payment
  toPay: 'К оплате',
  totalToPay: 'Итого к опалте',
  paymentPaid: 'Внесено средств',
  paymentChange: 'Сдача',

  // not-found
  pageNotFound: 'Страница не найдена',
  goToHome: 'Вернуться домой',

  // notifications
  error: 'Ошибка',
  success: 'Успех',
  info: 'Информация',
  warn: 'Предупреждение',
  loginError: 'Неправильный логин или пароль',
  registrationError: 'Пользователь с таким логином уже существует',
  updateError: 'Обновление данных не произошло',
  updateSuccess: 'Данные обновлены',
  coursesError: 'Ошибка при работе с курсами',
  generalError: 'Ошибка в работе сервера',
  generalSuccess: 'Операция проведена успешно',

  // confirmation
  confirm: 'Необходимо подверждение',
  confirmMessage: 'Вы уверены, что хотите удалить выбранный элемент?',
  acceptLabel: 'Да',
  rejectLabel: 'Нет',
};
