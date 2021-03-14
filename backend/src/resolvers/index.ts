import { merge } from 'lodash';

import login from './login';
import user from './user';

export default {
  ...merge(login, user),
};
