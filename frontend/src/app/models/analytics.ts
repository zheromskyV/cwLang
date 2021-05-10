import { Language } from './language';

export interface LanguagesAnalytics {
  student: Language[];
  teacher: Language[];
}

export interface CoursesAnalytics {
  initialLang: Language[];
  targetLang: Language[];
}

export interface GeneralMarksAnalytics {
  marks: number[];
}

export interface StudentMarksAnalytics {
  marks: number[];
}

export interface StudentMarksForTeacherAnalytics {
  pairs: {
    fullname: string;
    marks: [];
  }[];
}
