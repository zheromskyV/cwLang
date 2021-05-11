import { Action, createReducer, on } from '@ngrx/store';

import { MarksState, initialMarksState } from './marks.state';
import * as MarksActions from './marks.actions';

const reducer = createReducer(
  initialMarksState,
  on(MarksActions.setMarks, (state, { marks }) => ({
    ...state,
    marks,
  })),
  on(MarksActions.clearMarks, (state) => ({
    ...state,
    marks: [],
  }))
);

export function marksReducer(state: MarksState | undefined, action: Action) {
  return reducer(state, action);
}
