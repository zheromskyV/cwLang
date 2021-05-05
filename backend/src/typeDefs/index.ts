import { gql } from 'apollo-server';

import course from './course';
import group from './group';
import login from './login';
import schedule from './schedule';
import user from './user';
import word from './word';

export default gql`
  ${course}
  ${group}
  ${login}
  ${schedule}
  ${user}
  ${word}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
