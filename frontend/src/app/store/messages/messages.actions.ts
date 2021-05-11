import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/models/user';

export const sendQuestion = createAction('[MESSAGES] SEND_QUESTION', props<{ message: string }>());

export const sendDebtNotification = createAction('[MESSAGES] SEND_NOTIFICATION', props<{ user: User }>());
