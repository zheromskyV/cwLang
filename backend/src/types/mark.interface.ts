import { Document, Types } from 'mongoose';

export interface IMark extends Document {
  _id: Types.ObjectId;
  date?: Date;
  value: number;
  message: string;
};

