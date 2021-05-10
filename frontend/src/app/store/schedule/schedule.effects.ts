import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ScheduleService } from 'src/app/schedule/services/schedule.service';
import * as ScheduleActions from './schedule.actions';

@Injectable()
export class ScheduleEffects {
  constructor(private readonly actions$: Actions, private readonly scheduleService: ScheduleService) {}

  getStudents$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ScheduleActions.getEvents),
      switchMap(({ user }) => this.scheduleService.get(user)),
      switchMap((events) => [ScheduleActions.setEvents({ events })])
    )
  );
}
