import { Document, Types } from 'mongoose';

import { IWord } from './word.interface';

export interface ICourse extends Document {
  _id: Types.ObjectId;
  title: string;
  language: string;
  info: string;
  words: IWord[];
  price: number;
  rating: number;
}
