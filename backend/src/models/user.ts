import { model, Schema } from 'mongoose';

import { IUser } from '../types';

export const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthday: Number,
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  {
    versionKey: false,
  },
);

export const User = model<IUser>('User', UserSchema);
