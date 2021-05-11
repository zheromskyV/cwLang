import { createAction, props } from '@ngrx/store';

import { Mark, Marks } from 'src/app/models/marks';
import { User } from 'src/app/models/user';

export const getMarks = createAction('[MARKS] GET_MARKS', props<{ user: User }>());

export const setMarks = createAction('[MARKS] SET_MARKS', props<{ marks: Marks }>());

export const addMark = createAction('[MARKS] ADD_MARK', props<{ user: User; mark: Mark }>());

export const downloadMarks = createAction('[MARKS] DOWNLOAD_MARKS');

export const clearMarks = createAction('[MARKS] CLEAR_MARKS');
