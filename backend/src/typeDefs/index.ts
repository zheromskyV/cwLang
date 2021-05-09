import { gql } from 'apollo-server';

import course from './course';
import group from './group';
import login from './login';
import notification from './notification';
import payment from './payment';
import schedule from './schedule';
import student from './student';
import user from './user';
import word from './word';

export default gql`
  ${course}
  ${group}
  ${login}
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
