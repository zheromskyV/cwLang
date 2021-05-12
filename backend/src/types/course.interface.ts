import { Document, Types } from 'mongoose';

import { IWord } from './word.interface';

export interface ICourse extends Document {
  _id: Types.ObjectId;
  title: string;
  level: string;
  initialLang: string;
  targetLang: string;
  info: string;
  words: IWord[];
  price: number;
}
