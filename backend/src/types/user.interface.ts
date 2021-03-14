import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  role: string;
  password: string;
  name: string;
  surname: string;
  birthdate?: Date;
  nativeLanguage?: string;
  info?: string;
  debt?: number;
  discount?: number;
  rating?: number;
}
