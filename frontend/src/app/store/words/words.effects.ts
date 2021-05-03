import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from '../root.state';
import { WordsService } from 'src/app/words/services/words.service';
import { Word } from 'src/app/models/word';
import * as WordsActions from './words.actions';
import * as fromWords from './words.selectors';
import * as UiActions from '../ui/ui.actions';

@Injectable()
export class WordsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootState>,
    private readonly wordsService: WordsService
  ) {}

  getWords$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WordsActions.getWords),
      switchMap(({ initialLang, targetLang }) => this.wordsService.get(initialLang, targetLang)),
      switchMap((words) => [WordsActions.setWords({ words })])
    )
  );

  addWord$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WordsActions.addWord),
      switchMap(({ word }) => this.wordsService.create(word)),
      withLatestFrom(this.store.select(fromWords.getWords)),
      switchMap(([wordInfo, oldWords]) =>
        _.isEmpty(wordInfo)
          ? [UiActions.setWordsError({ isWordsError: true })]
          : [WordsActions.setWords({ words: [...oldWords, wordInfo as Word] })]
      )
    )
  );
}
