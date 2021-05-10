import { gql } from 'apollo-angular';

import { LANGUAGE } from './auth';

export const LANGUAGES_ANALYTICS = gql`
  query Analytics {
    languagesAnalytics {
      student ${LANGUAGE}
      teacher ${LANGUAGE}
    }
  }
`;

export const COURSES_ANALYTICS = gql`
  query Analytics {
    coursesAnalytics {
      initialLang ${LANGUAGE}
      targetLang ${LANGUAGE}
    }
  }
`;

export const GENERAL_MARKS = gql`
  query Analytics {
    generalMarks
  }
`;

export const STUDENT_MARKS = gql`
  query Analytics($id: String!) {
    studentMarks(id: $id)
  }
`;

export const STUDENT_MARKS_FOR_TEACHER = gql`
  query Analytics($groupId: String!) {
    studentMarksForTeacher(groupId: $groupId) {
      fullname
      marks
    }
  }
`;
