import { createAction, props } from '@ngrx/store';

import { Users } from 'src/app/models/user';

export const getStudents = createAction('[STUDENTS] GET_STUDENTS');

export const setStudents = createAction('[STUDENTS] SET_STUDENTS', props<{ students: Users }>());

export const clearStudents = createAction('[STUDENTS] CLEAR_STUDENTS');
