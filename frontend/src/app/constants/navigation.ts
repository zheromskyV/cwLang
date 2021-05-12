import { Roles } from './roles.enum';
import * as navLinks from './navigation-links';
import { NavigationModel } from '../models/navigation';

export const navigation = {
  [Roles.Admin]: [
    navLinks.navMyProfile,
    navLinks.navCourses,
    navLinks.navGroups,
    navLinks.navTeachers,
    navLinks.navStudents,
    navLinks.navDiscounts,
    navLinks.navPayment,
    navLinks.navAnalytics,
    navLinks.navMessages,
  ] as NavigationModel,
  [Roles.Teacher]: [
    navLinks.navMyProfile,
    navLinks.navCourses,
    navLinks.navGroups,
    navLinks.navSchedule,
    navLinks.navTesting,
    navLinks.navAnalytics,
  ] as NavigationModel,
  [Roles.Student]: [
    navLinks.navMyProfile,
    navLinks.navCourses,
    navLinks.navGroups,
    navLinks.navLearning,
    navLinks.navSchedule,
    navLinks.navTesting,
    navLinks.navAnalytics,
    navLinks.navConnect,
  ] as NavigationModel,
  [Roles.Undefined]: [] as NavigationModel,
};
