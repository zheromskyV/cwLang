import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from '../root.state';
import { WordsService } from 'src/app/words/services/words.service';
import { Word } from 'src/app/models/word';
import { User } from 'src/app/models/user';
import * as WordsActions from './words.actions';
import * as fromWords from './words.selectors';
import * as UiActions from '../ui/ui.actions';
import * as fromAuth from '../auth/auth.selectors';

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

  getStudentWords$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WordsActions.getStudentWords),
      switchMap(({ user }) => this.wordsService.getStudentsWords(user)),
      switchMap((studentWords) => [WordsActions.setStudentWords({ studentWords })])
    )
  );

  getFavoriteWords$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WordsActions.getFavoriteWords),
      switchMap(({ user }) => this.wordsService.getFavorites(user)),
      switchMap((favoriteWords) => [WordsActions.setFavoriteWords({ favoriteWords })])
    )
  );

  addWord$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WordsActions.addWord),
      switchMap(({ course, word }) => this.wordsService.create(course, word)),
      withLatestFrom(this.store.select(fromWords.getWords)),
      switchMap(([wordInfo, oldWords]) =>
        _.isEmpty(wordInfo)
          ? [UiActions.setGeneralError({ isGeneralError: true })]
          : [
              WordsActions.setWords({ words: [...oldWords, wordInfo as Word] }),
              UiActions.setGeneralSuccess({ isGeneralSuccess: true }),
            ]
      )
    )
  );

  addFavoriteWord$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WordsActions.addFavoriteWord),
      withLatestFrom(this.store.select(fromAuth.getUserInfo)),
      switchMap(([{ word }, user]) => this.wordsService.addFavorite(user as User, word)),
      withLatestFrom(this.store.select(fromWords.getFavoriteWords)),
      switchMap(([wordInfo, oldWords]) =>
        _.isEmpty(wordInfo)
          ? [UiActions.setGeneralError({ isGeneralError: true })]
          : [
              WordsActions.setFavoriteWords({ favoriteWords: [...oldWords, wordInfo as Word] }),
              UiActions.setGeneralSuccess({ isGeneralSuccess: true }),
            ]
      )
    )
  );

  downloadFavoriteWords$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WordsActions.downloadFavoriteWords),
      withLatestFrom(this.store.select(fromWords.getFavoriteWords)),
      switchMap(([_, favoriteWords]) => this.wordsService.downloadFavorites(favoriteWords)),
      switchMap(() => [UiActions.setGeneralSuccess({ isGeneralSuccess: true })])
    )
  );
}
