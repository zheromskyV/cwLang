import { createAction, props } from '@ngrx/store';

import {
  CoursesAnalytics,
  GeneralMarksAnalytics,
  LanguagesAnalytics,
  StudentMarksAnalytics,
  StudentMarksForTeacherAnalytics,
} from 'src/app/models/analytics';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';

export const getLanguagesAnalytics = createAction('[ANALYTICS] GET_LA');

export const setLanguagesAnalytics = createAction('[ANALYTICS] SET_LA', props<{ languages: LanguagesAnalytics }>());

export const getCoursesAnalytics = createAction('[ANALYTICS] GET_CA');

export const setCoursesAnalytics = createAction('[ANALYTICS] SET_CA', props<{ courses: CoursesAnalytics }>());

export const getGeneralMarksAnalytics = createAction('[ANALYTICS] GET_GMA');

export const setGeneralMarksAnalytics = createAction(
  '[ANALYTICS] SET_GMA',
  props<{ generalMarks: GeneralMarksAnalytics }>()
);

export const getStudentMarksAnalytics = createAction('[ANALYTICS] GET_SMA', props<{ user: User }>());

export const setStudentMarksAnalytics = createAction(
  '[ANALYTICS] SET_SMA',
  props<{ studentMarks: StudentMarksAnalytics }>()
);

export const getStudentMarksForTeacherAnalytics = createAction('[ANALYTICS] GET_SMRTA', props<{ group: Group }>());

export const setStudentMarksForTeacherAnalytics = createAction(
  '[ANALYTICS] SET_SMRTA',
  props<{ studentMarksForTeacher: StudentMarksForTeacherAnalytics }>()
);

export const clearAnalytics = createAction('[ANALYTICS] CLEAR_ANALYTICS');
