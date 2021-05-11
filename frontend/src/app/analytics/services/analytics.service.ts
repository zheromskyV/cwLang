import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  COURSES_ANALYTICS,
  GENERAL_MARKS,
  LANGUAGES_ANALYTICS,
  STUDENT_MARKS,
  STUDENT_MARKS_FOR_TEACHER,
} from 'src/app/api/analytics';
import {
  CoursesAnalytics,
  GeneralMarksAnalytics,
  LanguagesAnalytics,
  StudentMarksAnalytics,
  StudentMarksForTeacherAnalytics,
} from 'src/app/models/analytics';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private readonly apollo: Apollo) {}

  getLanguagesAnalytics(): Observable<LanguagesAnalytics> {
    return this.apollo
      .query<{ languagesAnalytics: LanguagesAnalytics }>({
        query: LANGUAGES_ANALYTICS,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.languagesAnalytics),
        catchError(() => of({ student: [], teacher: [] }))
      );
  }

  getCoursesAnalytics(): Observable<CoursesAnalytics> {
    return this.apollo
      .query<{ coursesAnalytics: CoursesAnalytics }>({
        query: COURSES_ANALYTICS,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.coursesAnalytics),
        catchError(() => of({ initialLang: [], targetLang: [] }))
      );
  }

  getGeneralMarksAnalytics(): Observable<GeneralMarksAnalytics> {
    return this.apollo
      .query<{ generalMarks: GeneralMarksAnalytics }>({
        query: GENERAL_MARKS,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.generalMarks),
        catchError(() => of([]))
      );
  }

  getStudentMarksAnalytics(user: User): Observable<StudentMarksAnalytics> {
    return this.apollo
      .query<{ studentMarks: StudentMarksAnalytics }>({
        query: STUDENT_MARKS,
        variables: { id: user._id },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.studentMarks),
        catchError(() => of([]))
      );
  }

  getStudentMarksForTeacherAnalytics(group: Group): Observable<StudentMarksForTeacherAnalytics> {
    return this.apollo
      .query<{ studentMarksForTeacher: StudentMarksForTeacherAnalytics }>({
        query: STUDENT_MARKS_FOR_TEACHER,
        variables: { groupId: group._id },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.studentMarksForTeacher),
        catchError(() => of([]))
      );
  }
}
