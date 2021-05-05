import { merge } from 'lodash';

import course from './course';
import group from './group';
import login from './login';
import schedule from './schedule';
import user from './user';
import word from './words';

export default {
  ...merge(
    course,
    group,
    login,
    schedule,
    user,
    word
  ),
};
