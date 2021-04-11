import { model, Schema } from 'mongoose';

import { ICourse } from '../types';

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    info: { type: String, required: true },
    language: { type: String, required: true },
    discount: { type: Number, required: true },
    rating: Number,
    words: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Word',
      },
    ],
  },
  {
    versionKey: false,
  },
);

export const Course = model<ICourse>('Course', CourseSchema);
