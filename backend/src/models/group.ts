import { model, Schema } from 'mongoose';

import { IGroup } from '../types';

const GroupSchema = new Schema(
  {
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: 'Schedule',
    },
  },
  {
    versionKey: false,
  },
);

export const Group = model<IGroup>('Group', GroupSchema);
