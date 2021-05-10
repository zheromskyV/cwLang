import { createAction, props } from '@ngrx/store';

import { ScheduleEvents } from 'src/app/models/schedule';
import { User } from 'src/app/models/user';

export const getEvents = createAction('[SCHEDULE] GET_EVENTS', props<{ user: User }>());

export const setEvents = createAction('[SCHEDULE] SET_EVENTS', props<{ events: ScheduleEvents }>());

export const clearEvents = createAction('[SCHEDULE] CLEAR_EVENTS');
