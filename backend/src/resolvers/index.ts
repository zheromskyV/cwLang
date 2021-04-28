import { merge } from 'lodash';

import login from './login';
import user from './user';
import word from './words';

export default {
  ...merge(
    login,
    user,
    word
  ),
};
