import { merge } from 'lodash';

import course from './course';
import login from './login';
import user from './user';
import word from './words';

export default {
  ...merge(
    course,
    login,
    user,
    word
  ),
};
