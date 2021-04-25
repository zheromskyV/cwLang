import { gql } from 'apollo-angular';

const User = `{
  email
  password
  role
  name
  surname
  birthday
  profile {
    nativeLanguage
    debt
    info
    rating
    languages {
      name
      value
    }
  }
}`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) ${User}
  }
`;

export const SIGN_UP = gql`
  mutation User($user: UserInput!) {
    createUser(user: $user) ${User}
  }
`;
