import { gql } from 'apollo-angular';

export const LANGUAGE = `{
  name
  value
}`;

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
    discount
    info
    rating
    languages ${LANGUAGE}
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

export const GET_USERS = gql`
  query User($role: String!) {
    getUsersByRole(role: $role) ${USER}
  }
`;
