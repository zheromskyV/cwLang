import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StudentsService } from 'src/app/students/services/students.service';
import * as StudentsActions from './students.actions';

@Injectable()
export class StudentsEffects {
  constructor(private readonly actions$: Actions, private readonly studentsService: StudentsService) {}

  getStudents$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.getStudents),
      switchMap(() => this.studentsService.get()),
      switchMap((students) => [StudentsActions.setStudents({ students })])
    )
  );
}
