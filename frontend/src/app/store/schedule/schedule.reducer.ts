import { Action, createReducer, on } from '@ngrx/store';

import { ScheduleState, initialScheduleState } from './schedule.state';
import * as ScheduleActions from './schedule.actions';

const reducer = createReducer(
  initialScheduleState,
  on(ScheduleActions.setEvents, (state, { events }) => ({
    ...state,
    events,
  })),
  on(ScheduleActions.clearEvents, (state) => ({
    ...state,
    events: [],
  }))
);

export function scheduleReducer(state: ScheduleState | undefined, action: Action) {
  return reducer(state, action);
}
