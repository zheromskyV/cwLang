import { Action, createReducer, on } from '@ngrx/store';

import { CoursesState, initialCoursesState } from './courses.state';
import * as CoursesActions from './courses.actions';

const reducer = createReducer(
  initialCoursesState,
  on(CoursesActions.setCourses, (state, { courses }) => ({
    ...state,
    courses,
  })),
  on(CoursesActions.clearCourses, (state) => ({
    ...state,
    courses: [],
  }))
);

export function coursesReducer(state: CoursesState | undefined, action: Action) {
  return reducer(state, action);
}
