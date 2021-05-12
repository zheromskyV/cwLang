import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Words } from 'src/app/models/word';
import { StoreFeature } from '../store.enum';
import { WordsState } from './words.state';

const rootSelector = createFeatureSelector<WordsState>(StoreFeature.Words);

export const getWords = createSelector(rootSelector, (state: WordsState): Words => state.words);

export const getStudentWords = createSelector(rootSelector, (state: WordsState): Words => state.studentWords);

export const getFavoriteWords = createSelector(rootSelector, (state: WordsState): Words => state.favoriteWords);
