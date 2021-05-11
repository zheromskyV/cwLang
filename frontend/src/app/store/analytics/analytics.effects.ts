import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AnalyticsService } from 'src/app/analytics/services/analytics.service';
import * as AnalyticsActions from './analytics.actions';

@Injectable()
export class AnalyticsEffects {
  constructor(private readonly actions$: Actions, private readonly analyticsService: AnalyticsService) {}

  getLanguagesAnalytics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsActions.getLanguagesAnalytics),
      switchMap(() => this.analyticsService.getLanguagesAnalytics()),
      switchMap((languages) => [AnalyticsActions.setLanguagesAnalytics({ languages })])
    )
  );

  getCoursesAnalytics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsActions.getCoursesAnalytics),
      switchMap(() => this.analyticsService.getCoursesAnalytics()),
      switchMap((courses) => [AnalyticsActions.setCoursesAnalytics({ courses })])
    )
  );

  getGeneralMarksAnalytics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsActions.getGeneralMarksAnalytics),
      switchMap(() => this.analyticsService.getGeneralMarksAnalytics()),
      switchMap((generalMarks) => [AnalyticsActions.setGeneralMarksAnalytics({ generalMarks })])
    )
  );

  getStudentMarksAnalytics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsActions.getStudentMarksAnalytics),
      switchMap(({ user }) => this.analyticsService.getStudentMarksAnalytics(user)),
      switchMap((studentMarks) => [AnalyticsActions.setStudentMarksAnalytics({ studentMarks })])
    )
  );

  getStudentMarksForTeacherAnalytics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsActions.getStudentMarksForTeacherAnalytics),
      switchMap(({ group }) => this.analyticsService.getStudentMarksForTeacherAnalytics(group)),
      switchMap((studentMarksForTeacher) => [
        AnalyticsActions.setStudentMarksForTeacherAnalytics({ studentMarksForTeacher }),
      ])
    )
  );
}
