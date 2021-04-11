import { Document, Types } from 'mongoose';

import { IGroup } from './group.interface';
import { ILanguage } from './language.interface';
import { IMark } from './mark.interface';
import { IWord } from './word.interface';

export interface IProfile extends Document {
  _id: Types.ObjectId;
  nativeLanguage: string;
  info?: string;
  debt?: number;
  discount?: number;
  rating?: number;
  groups?: IGroup[];
  marks?: IMark[];
  favoriteWords?: IWord[];
  languages?: ILanguage[];
}
