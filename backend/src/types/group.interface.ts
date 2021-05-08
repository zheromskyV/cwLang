import { Document, Types } from 'mongoose';

import { ICourse } from './course.interface';
import { ISchedule } from './schedule.interface';
import { IUser } from './user.interface';

export interface IGroup extends Document {
  _id: Types.ObjectId;
  students?: IUser[];
  teacher: IUser | string;
  course: ICourse | string;
  schedule: ISchedule;
}
