import { gql } from 'apollo-server';

import login from './login';
import user from './user';
import word from './word';

export default gql`
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
