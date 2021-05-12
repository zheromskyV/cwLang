import { gql } from 'apollo-angular';

import { USER } from './auth';

export const ADD_STUDENT_TO_GROUP = gql`
  mutation Student($userId: String!, $groupId: String!) {
    addStudentToGroup(userId: $userId, groupId: $groupId) ${USER}
  }
`;

export const REMOVE_STUDENT_FROM_GROUP = gql`
  mutation Student($userId: String!, $groupId: String!) {
    removeStudentFromGroup(userId: $userId, groupId: $groupId) ${USER}
  }
`;
