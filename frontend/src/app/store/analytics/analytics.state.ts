import {
  CoursesAnalytics,
  GeneralMarksAnalytics,
  LanguagesAnalytics,
  StudentMarksAnalytics,
  StudentMarksForTeacherAnalytics,
} from 'src/app/models/analytics';

export interface AnalyticsState {
  languages: LanguagesAnalytics;
  courses: CoursesAnalytics;
  generalMarks: GeneralMarksAnalytics;
  studentMarks: StudentMarksAnalytics;
  studentMarksForTeacher: StudentMarksForTeacherAnalytics;
}

export const initialAnalyticsState: AnalyticsState = {
  languages: { student: [], teacher: [] },
  courses: { initialLang: [], targetLang: [] },
  generalMarks: [],
  studentMarks: [],
  studentMarksForTeacher: [],
};
