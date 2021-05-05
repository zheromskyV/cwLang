import { Document, Types } from 'mongoose';

export interface ISchedule extends Document {
  _id: Types.ObjectId;
  title: string;
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur: string;
  daysOfWeek: number[];
}
