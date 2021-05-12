import { PrimeIcons } from 'primeng/api';

import { NavigationLinkModel } from '../models/navigation-link';
import { dictionary } from './dictionary';
import { routerPaths } from './router-paths';

export const navMyProfile: NavigationLinkModel = {
  name: dictionary.myProfile,
  url: routerPaths.myProfile,
  icon: PrimeIcons.ID_CARD,
};

export const navCourses: NavigationLinkModel = {
  name: dictionary.courses,
  url: routerPaths.courses,
  icon: PrimeIcons.BOOK,
};

export const navGroups: NavigationLinkModel = {
  name: dictionary.groups,
  url: routerPaths.groups,
  icon: PrimeIcons.USERS,
};

export const navTeachers: NavigationLinkModel = {
  name: dictionary.teachers,
  url: routerPaths.teachers,
  icon: PrimeIcons.USER_EDIT,
};

export const navStudents: NavigationLinkModel = {
  name: dictionary.students,
  url: routerPaths.students,
  icon: PrimeIcons.USER,
};

export const navDiscounts: NavigationLinkModel = {
  name: dictionary.discounts,
  url: routerPaths.discounts,
  icon: PrimeIcons.PERCENTAGE,
};

export const navPayment: NavigationLinkModel = {
  name: dictionary.payment,
  url: routerPaths.payment,
  icon: PrimeIcons.WALLET,
};

export const navAnalytics: NavigationLinkModel = {
  name: dictionary.analytics,
  url: routerPaths.analytics,
  icon: PrimeIcons.CHART_BAR,
};

export const navMessages: NavigationLinkModel = {
  name: dictionary.messages,
  url: routerPaths.messages,
  icon: PrimeIcons.SEND,
};

export const navSchedule: NavigationLinkModel = {
  name: dictionary.schedule,
  url: routerPaths.schedule,
  icon: PrimeIcons.CALENDAR,
};

export const navTesting: NavigationLinkModel = {
  name: dictionary.testing,
  url: routerPaths.testing,
  icon: PrimeIcons.PENCIL,
};

export const navLearning: NavigationLinkModel = {
  name: dictionary.learning,
  url: routerPaths.learning,
  icon: PrimeIcons.SLACK,
};

export const navGame: NavigationLinkModel = {
  name: dictionary.game,
  url: routerPaths.game,
  icon: PrimeIcons.COMPASS,
};

export const navConnect: NavigationLinkModel = {
  name: dictionary.connect,
  url: routerPaths.connect,
  icon: PrimeIcons.COMMENTS,
};
