import { Document, Types } from 'mongoose';

export interface ILanguage extends Document {
  _id: Types.ObjectId;
  name: string;
  value: number;
}
