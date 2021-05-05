import { gql } from 'apollo-angular';

export const SCHEDULE = `{
    title
    startTime
    endTime
    startRecur
    endRecur
    daysOfWeek
  }
`;

export const GET_USER_SCHEDULE = gql`
  query Schedule($id: number) {
    getUserSchedule(id: $id) ${SCHEDULE}
  }
`;
