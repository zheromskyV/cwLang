import { ScheduleEvents } from 'src/app/models/schedule';

export interface ScheduleState {
  events: ScheduleEvents;
}

export const initialScheduleState: ScheduleState = {
  events: [],
};
