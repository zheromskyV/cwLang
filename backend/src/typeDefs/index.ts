import { gql } from 'apollo-server';

import analytics from './analytics';
import course from './course';
import group from './group';
import login from './login';
import mark from './mark';
import notification from './notification';
import payment from './payment';
import schedule from './schedule';
import student from './student';
import user from './user';
import word from './word';

export default gql`
  ${analytics}
  ${course}
  ${group}
  ${login}
  ${mark}
  ${notification}
  ${payment}
  ${schedule}
  ${student}
  ${user}
  ${word}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
