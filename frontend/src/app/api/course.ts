import { gql } from 'apollo-angular';

export const COURSE = `{
  _id,
  title,
  info,
  price,
  initialLang,
  targetLang,
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

export const GET_USER_COURSE = gql`
  query Course($id: String!) {
    getUserCourses(id: $id) ${COURSE}
  }
`;
