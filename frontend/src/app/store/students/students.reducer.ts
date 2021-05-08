import { Action, createReducer, on } from '@ngrx/store';

import { StudentsState, initialStudentsState } from './students.state';
import * as StudentsActions from './students.actions';

const reducer = createReducer(
  initialStudentsState,
  on(StudentsActions.setStudents, (state, { students }) => ({
    ...state,
    students,
  })),
  on(StudentsActions.clearStudents, (state) => ({
    ...state,
    students: [],
  }))
);

export function studentsReducer(state: StudentsState | undefined, action: Action) {
  return reducer(state, action);
}
