import { merge } from 'lodash';

import analytics from './analytics';
import course from './course';
import group from './group';
import login from './login';
import marks from './marks';
import notification from './notification';
import payment from './payment';
import schedule from './schedule';
import student from './student';
import user from './user';
import word from './words';

export default {
  ...merge(analytics, course, group, login, marks, notification, payment, schedule, student, user, word),
};
