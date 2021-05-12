import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { StudentsState } from './students.state';
import { Users } from 'src/app/models/user';

const rootSelector = createFeatureSelector<StudentsState>(StoreFeature.Students);

export const getStudents = createSelector(rootSelector, (state: StudentsState): Users => state.students);
