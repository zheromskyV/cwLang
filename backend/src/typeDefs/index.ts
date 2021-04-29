import { gql } from 'apollo-server';

import course from './course';
import login from './login';
import user from './user';
import word from './word';

export default gql`
  ${course}
  ${login}
  ${user}
  ${word}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
