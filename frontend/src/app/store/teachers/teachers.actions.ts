import { createAction, props } from '@ngrx/store';

import { Users } from 'src/app/models/user';

export const getTeachers = createAction('[TEACHERS] GET_TEACHERS');

export const setTeachers = createAction('[TEACHERS] SET_TEACHERS', props<{ teachers: Users }>());

export const clearTeachers = createAction('[TEACHERS] CLEAR_TEACHERS');
