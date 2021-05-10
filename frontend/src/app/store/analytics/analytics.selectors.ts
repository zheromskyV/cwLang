import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { AnalyticsState } from './analytics.state';
import {
  CoursesAnalytics,
  GeneralMarksAnalytics,
  LanguagesAnalytics,
  StudentMarksAnalytics,
  StudentMarksForTeacherAnalytics,
} from 'src/app/models/analytics';

const rootSelector = createFeatureSelector<AnalyticsState>(StoreFeature.Analytics);

export const getLanguagesAnalytics = createSelector(
  rootSelector,
  (state: AnalyticsState): LanguagesAnalytics => state.languages
);

export const getCoursesAnalytics = createSelector(
  rootSelector,
  (state: AnalyticsState): CoursesAnalytics => state.courses
);

export const getGeneralMarksAnalytics = createSelector(
  rootSelector,
  (state: AnalyticsState): GeneralMarksAnalytics => state.generalMarks
);

export const getStudentMarksAnalytics = createSelector(
  rootSelector,
  (state: AnalyticsState): StudentMarksAnalytics => state.studentMarks
);

export const getStudentMarksForTeacherAnalytics = createSelector(
  rootSelector,
  (state: AnalyticsState): StudentMarksForTeacherAnalytics => state.studentMarksForTeacher
);
