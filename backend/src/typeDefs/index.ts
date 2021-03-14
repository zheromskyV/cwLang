import { gql } from 'apollo-server';

import login from './login';
import user from './user';

export default gql`
  ${login}
  ${user}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
