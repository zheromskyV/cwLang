import { model, Schema } from 'mongoose';

import { ILanguage } from '../types';

const LanguageSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

export const Language = model<ILanguage>('Language', LanguageSchema);
