import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Courses } from 'src/app/models/course';
import { StoreFeature } from '../store.enum';
import { CoursesState } from './courses.state';

const rootSelector = createFeatureSelector<CoursesState>(StoreFeature.Courses);

export const getCourses = createSelector(rootSelector, (state: CoursesState): Courses => state.courses);
