import { gql } from 'apollo-angular';

import { COURSE } from './course';
import { SCHEDULE } from './schedule';
import { USER } from './auth';

export const GROUP = `{
  _id
  students ${USER}
  teacher ${USER}
  course ${COURSE}
  schedule ${SCHEDULE}
}`;

export const GET_GROUPS = gql`
  query Group {
    getGroups ${GROUP}
  }
`;

export const CREATE_GROUP = gql`
  mutation Group($group: GroupInput!) {
    createGroup(group: $group) ${GROUP}
  }
`;

export const UPDATE_GROUP = gql`
  mutation Group($id: String!, $group: GroupInput!) {
    updateGroup(id: $id, group: $group) ${GROUP}
  }
`;

export const GET_USER_GROUPS = gql`
  query Group($id: String!) {
    getUserGroups(id: $id) ${GROUP}
  }
`;

export const DELETE_GROUP = gql`
  mutation Group($id: String!) {
    deleteGroup(id: $id)
  }
`;
