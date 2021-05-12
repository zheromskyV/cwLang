import { model, Schema } from 'mongoose';

import { ICourse } from '../types';

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    info: { type: String, required: true },
    initialLang: { type: String, required: true },
    targetLang: { type: String, required: true },
    price: { type: String, required: true },
    level: { type: String, required: true },
    words: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Word',
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const Course = model<ICourse>('Course', CourseSchema);
