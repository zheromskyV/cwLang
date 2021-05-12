import { model, Schema } from 'mongoose';

import { IProfile } from '../types';

const ProfileSchema = new Schema(
  {
    info: String,
    debt: Number,
    discount: { type: Number, default: 0 },
    rating: Number,
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    marks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Mark',
      },
    ],
    favoriteWords: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Word',
      },
    ],
    languages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Language',
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const Profile = model<IProfile>('Profile', ProfileSchema);
