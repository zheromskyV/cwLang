import { merge } from 'lodash';

import course from './course';
import group from './group';
import login from './login';
import notification from './notification';
import payment from './payment';
import schedule from './schedule';
import student from './student';
import user from './user';
import word from './words';

export default {
  ...merge(
    course,
    group,
    login,
    notification,
    payment,
    schedule,
    student,
    user,
    word
  ),
};
