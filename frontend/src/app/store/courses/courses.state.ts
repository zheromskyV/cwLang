import { Courses } from 'src/app/models/course';

export interface CoursesState {
  courses: Courses;
}

export const initialCoursesState: CoursesState = {
  courses: [],
};
