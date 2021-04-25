import { Document, Types } from 'mongoose';

import { IProfile } from './profile.interface';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  role: string;
  password: string;
  name: string;
  surname: string;
  birthday: number;
  profile: IProfile;
}
