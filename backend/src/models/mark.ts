import { model, Schema } from 'mongoose';

import { IMark } from '../types';

const MarkSchema = new Schema(
  {
    date: { type: Date, required: true },
    value: { type: Number, required: true },
    message: String,
  },
  {
    versionKey: false,
  },
);

export const Mark = model<IMark>('Mark', MarkSchema);
