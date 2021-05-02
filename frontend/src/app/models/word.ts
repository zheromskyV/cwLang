import { Languages } from '../constants/languages.enum';

export interface Word {
  _id?: string;
  target: string;
  initial: string;
  targetLang: Languages;
  initialLang: Languages;
}

export type Words = Word[];

export type WordInfo = Word | null | undefined;
