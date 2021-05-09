import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TeachersService } from 'src/app/teachers/services/teachers.service';
import * as TeachersActions from './teachers.actions';

@Injectable()
export class TeachersEffects {
  constructor(private readonly actions$: Actions, private readonly teachersService: TeachersService) {}

  getStudents$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TeachersActions.getTeachers),
      switchMap(() => this.teachersService.get()),
      switchMap((teachers) => [TeachersActions.setTeachers({ teachers })])
    )
  );
}
