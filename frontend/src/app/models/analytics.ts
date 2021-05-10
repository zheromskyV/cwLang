import { Language } from './language';

export interface LanguagesAnalytics {
  student: Language[];
  teacher: Language[];
}

export interface CoursesAnalytics {
  initialLang: Language[];
  targetLang: Language[];
}

export type GeneralMarksAnalytics = number[];

export type StudentMarksAnalytics = number[];

export interface StudentMarksForTeacherPair {
  fullname: string;
  marks: [];
}

export type StudentMarksForTeacherAnalytics = StudentMarksForTeacherPair[];
