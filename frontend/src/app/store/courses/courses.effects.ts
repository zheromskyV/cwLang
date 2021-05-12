import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from '../root.state';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { Course } from 'src/app/models/course';
import * as CoursesActions from './courses.actions';
import * as fromCourses from './courses.selectors';
import * as UiActions from '../ui/ui.actions';

@Injectable()
export class CoursesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootState>,
    private readonly coursesService: CoursesService
  ) {}

  getCourses$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.getCourses),
      switchMap(() => this.coursesService.getAll()),
      switchMap((courses) => [CoursesActions.setCourses({ courses })])
    )
  );

  addCourse$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.addCourse),
      switchMap(({ course }) => this.coursesService.create(course)),
      withLatestFrom(this.store.select(fromCourses.getCourses)),
      switchMap(([courseInfo, oldCourses]) =>
        _.isEmpty(courseInfo)
          ? [UiActions.setCoursesError({ isCoursesError: true })]
          : [
              CoursesActions.setCourses({ courses: [...oldCourses, courseInfo as Course] }),
              UiActions.setGeneralSuccess({ isGeneralSuccess: true }),
            ]
      )
    )
  );

  updateCourse$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      switchMap(({ course }) => this.coursesService.update(course)),
      withLatestFrom(this.store.select(fromCourses.getCourses)),
      switchMap(([courseInfo, oldCourses]) =>
        _.isEmpty(courseInfo)
          ? [UiActions.setCoursesError({ isCoursesError: true })]
          : [
              CoursesActions.setCourses({
                courses: oldCourses.map((currCourse) => ({
                  ...currCourse,
                  ...(currCourse._id === courseInfo!._id && courseInfo),
                })),
              }),
              UiActions.setGeneralSuccess({ isGeneralSuccess: true }),
            ]
      )
    )
  );

  deleteCourse$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      switchMap(({ course }) => this.coursesService.delete(course)),
      withLatestFrom(this.store.select(fromCourses.getCourses)),
      switchMap(([deletedId, oldCourses]) =>
        _.isEmpty(deletedId)
          ? [UiActions.setCoursesError({ isCoursesError: true })]
          : [
              CoursesActions.setCourses({ courses: oldCourses.filter(({ _id }) => _id !== deletedId) }),
              UiActions.setGeneralSuccess({ isGeneralSuccess: true }),
            ]
      )
    )
  );
}
