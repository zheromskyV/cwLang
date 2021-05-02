import { LanguageLevels } from '../constants/language-levels.enum';
import { Languages } from '../constants/languages.enum';
import { Word } from './word';

export interface Course {
  _id?: string;
  title: string;
  info: string;
  price: number;
  language: Languages;
  level: LanguageLevels;
  words: Word[];
}

export type Courses = Course[];

export type CourseInfo = Course | undefined | null;
