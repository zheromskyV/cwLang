import { Action, createReducer, on } from '@ngrx/store';

import { AnalyticsState, initialAnalyticsState } from './analytics.state';
import * as AnalyticsActions from './analytics.actions';

const reducer = createReducer(
  initialAnalyticsState,
  on(AnalyticsActions.setLanguagesAnalytics, (state, { languages }) => ({
    ...state,
    languages,
  })),
  on(AnalyticsActions.setCoursesAnalytics, (state, { courses }) => ({
    ...state,
    courses,
  })),
  on(AnalyticsActions.setGeneralMarksAnalytics, (state, { generalMarks }) => ({
    ...state,
    generalMarks,
  })),
  on(AnalyticsActions.setStudentMarksAnalytics, (state, { studentMarks }) => ({
    ...state,
    studentMarks,
  })),
  on(AnalyticsActions.setStudentMarksForTeacherAnalytics, (state, { studentMarksForTeacher }) => ({
    ...state,
    studentMarksForTeacher,
  })),
  on(AnalyticsActions.clearAnalytics, (state) => ({
    ...state,
    ...initialAnalyticsState,
  }))
);

export function analyticsReducer(state: AnalyticsState | undefined, action: Action) {
  return reducer(state, action);
}
