import { model, Schema } from 'mongoose';

import { ISchedule } from '../types';

const ScheduleSchema = new Schema(
  {
    title: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    startRecur: { type: String, required: true },
    endRecur: { type: String, required: true },
    daysOfWeek: { type: [Number], required: true },
  },
  {
    versionKey: false,
  },
);

export const Schedule = model<ISchedule>('Schedule', ScheduleSchema);
