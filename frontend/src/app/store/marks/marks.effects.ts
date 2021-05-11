import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RootState } from '../root.state';
import { MarksService } from 'src/app/marks/services/marks.service';
import * as MarksActions from './marks.actions';
import * as UiActions from '../ui/ui.actions';

@Injectable()
export class MarksEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootState>,
    private readonly wordsService: MarksService
  ) {}

  getMarks$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(MarksActions.getMarks),
      switchMap(({ user }) => this.wordsService.get(user)),
      switchMap((marks) => [MarksActions.setMarks({ marks })])
    )
  );

  addMark$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(MarksActions.addMark),
      switchMap(({ user, mark }) => this.wordsService.add(user, mark)),
      switchMap((markInfo) =>
        _.isEmpty(markInfo)
          ? [UiActions.setGeneralError({ isGeneralError: true })]
          : [UiActions.setGeneralSuccess({ isGeneralSuccess: true })]
      )
    )
  );
}
