import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CREATE_COURSE, DELETE_COURSE, GET_COURSES, UPDATE_COURSE } from 'src/app/api/course';
import { Course, CourseInfo, Courses } from 'src/app/models/course';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private readonly apollo: Apollo) {}

  getAll(): Observable<Courses> {
    return this.apollo
      .query<{ getCourses: Courses }>({
        query: GET_COURSES,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.getCourses),
        catchError(() => of([]))
      );
  }

  create(course: Course): Observable<CourseInfo> {
    return this.apollo
      .mutate<{ createCourse: Course }>({
        mutation: CREATE_COURSE,
        variables: { course: UtilsService.cleanObject(course) },
      })
      .pipe(
        map(({ data }) => data?.createCourse),
        catchError(() => of(null))
      );
  }

  update(course: Course): Observable<CourseInfo> {
    return this.apollo
      .mutate<{ updateCourse: Course }>({
        mutation: UPDATE_COURSE,
        variables: {
          id: course._id,
          course: UtilsService.cleanObject(course),
        },
      })
      .pipe(
        map(({ data }) => data?.updateCourse),
        catchError(() => of(null))
      );
  }

  delete({ _id: id }: Course): Observable<string> {
    return this.apollo
      .mutate({
        mutation: DELETE_COURSE,
        variables: { id },
      })
      .pipe(
        map(() => id || ''),
        catchError(() => of(''))
      );
  }
}
