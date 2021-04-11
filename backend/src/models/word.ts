import { model, Schema } from 'mongoose';

import { IWord } from '../types';

const WordSchema = new Schema(
  {
    target: { type: String, required: true },
    initial: { type: String, required: true },
    targetLang: { type: String, required: true },
    initialLang: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

export const Word = model<IWord>('Word', WordSchema);
