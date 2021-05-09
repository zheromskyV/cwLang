import { Action, createReducer, on } from '@ngrx/store';

import { TeachersState, initialTeachersState } from './teachers.state';
import * as TeachersActions from './teachers.actions';

const reducer = createReducer(
  initialTeachersState,
  on(TeachersActions.setTeachers, (state, { teachers }) => ({
    ...state,
    teachers,
  })),
  on(TeachersActions.clearTeachers, (state) => ({
    ...state,
    teachers: [],
  }))
);

export function teachersReducer(state: TeachersState | undefined, action: Action) {
  return reducer(state, action);
}
