import { gql } from 'apollo-angular';

export const USER = `{
  _id
  email
  password
  role
  name
  surname
  birthday
  nativeLanguage
  profile {
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
    login(email: $email, password: $password) ${USER}
  }
`;

export const CREATE_USER = gql`
  mutation User($user: UserInput!) {
    createUser(user: $user) ${USER}
  }
`;

export const UPDATE_USER = gql`
  mutation User($id: String!, $user: UserInput!) {
    updateUser(id: $id, user: $user) ${USER}
  }
`;
