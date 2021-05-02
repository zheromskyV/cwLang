import { gql } from 'apollo-angular';

const COURSE = `{
  _id,
  title,
  info,
  price,
  language,
  level,
  words {
    _id,
    target,
    initial,
    targetLang,
    initialLang,
  }
}`;

export const GET_COURSES = gql`
  query Course {
    getCourses ${COURSE}
  }
`;

export const CREATE_COURSE = gql`
  mutation Course($course: CourseInput!) {
    createCourse(course: $course) ${COURSE}
  }
`;

export const UPDATE_COURSE = gql`
  mutation Course($id: String!, $course: CourseInput!) {
    updateCourse(id: $id, course: $course) ${COURSE}
  }
`;

export const DELETE_COURSE = gql`
  mutation Course($id: String!) {
    deleteCourse(id: $id)
  }
`;
