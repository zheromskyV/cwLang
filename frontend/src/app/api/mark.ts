import { gql } from 'apollo-angular';

export const MARK = `{
  _id,
  value,
  message
}`;

export const ADD_MARK = gql`
  mutation Mark($userId: String!, $mark: MarkInput!) {
    addMark(userId: $userId, mark: $mark) ${MARK}
  }
`;

export const GET_USER_MARKS = gql`
  query Mark($userId: String!) {
    getUserMarks(userId: $userId) ${MARK}
  }
`;
