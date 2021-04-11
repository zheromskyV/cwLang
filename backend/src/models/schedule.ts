import { model, Schema } from 'mongoose';

import { ISchedule } from '../types';

const ScheduleSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    daysOfWeek: { type: [Number], required: true },
    date: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

export const Schedule = model<ISchedule>('Schedule', ScheduleSchema);
