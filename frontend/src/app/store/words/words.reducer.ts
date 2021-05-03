import { Action, createReducer, on } from '@ngrx/store';

import { WordsState, initialWordsState } from './words.state';
import * as WordsActions from './words.actions';

const reducer = createReducer(
  initialWordsState,
  on(WordsActions.setWords, (state, { words }) => ({
    ...state,
    words,
  })),
  on(WordsActions.clearWords, (state) => ({
    ...state,
    words: [],
  }))
);

export function wordsReducer(state: WordsState | undefined, action: Action) {
  return reducer(state, action);
}
