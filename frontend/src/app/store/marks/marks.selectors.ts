import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { MarksState } from './marks.state';
import { Marks } from 'src/app/models/marks';

const rootSelector = createFeatureSelector<MarksState>(StoreFeature.Marks);

export const getMarks = createSelector(rootSelector, (state: MarksState): Marks => state.marks);
