import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { TeachersState } from './teachers.state';
import { Users } from 'src/app/models/user';

const rootSelector = createFeatureSelector<TeachersState>(StoreFeature.Teachers);

export const getTeachers = createSelector(rootSelector, (state: TeachersState): Users => state.teachers);
