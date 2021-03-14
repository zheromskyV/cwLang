import { ObjectID } from 'mongodb';
import { model, Schema, Types } from 'mongoose';

import { IUser } from '../types/user.interface';

export const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthdate: Date,
    nativeLanguage: String,
    info: String,
    debt: Number,
    discount: Number,
    rating: Number,
  },
  {
    versionKey: false,
  }
);

export const User = model<IUser>('User', UserSchema);
