import { Document, Types } from 'mongoose';

export interface IWord extends Document {
  _id: Types.ObjectId;
  target: string;
  initial: string;
  targetLang: string;
  initialLang: string;
}
