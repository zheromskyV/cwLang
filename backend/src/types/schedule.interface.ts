import { Document, Types } from 'mongoose';

export interface ISchedule extends Document {
  _id: Types.ObjectId;
  title: string;
  duration: string;
  daysOfWeek: number[];
  date: string;
}
