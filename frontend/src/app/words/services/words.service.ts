import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ADD_FAVORITE_WORD, CREATE_WORD, GET_ALL_USER_WORDS, GET_FAVORITE_WORDS, GET_WORDS } from 'src/app/api/word';
import { Word, WordInfo, Words } from 'src/app/models/word';
import { Languages } from 'src/app/constants/languages.enum';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private readonly apollo: Apollo) {}

  get(initialLang: Languages, targetLang: Languages): Observable<Words> {
    return this.apollo
      .query<{ getWords: Words }>({
        query: GET_WORDS,
        variables: { initialLang, targetLang },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.getWords),
        catchError(() => of([]))
      );
  }

  getFavorites(user: User): Observable<Words> {
    return this.apollo
      .query<{ getFavoriteWords: Words }>({
        query: GET_FAVORITE_WORDS,
        variables: { id: user._id },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.getFavoriteWords),
        catchError(() => of([]))
      );
  }

  getStudentsWords(user: User): Observable<Words> {
    return this.apollo
      .query<{ getAllUserWords: Words }>({
        query: GET_ALL_USER_WORDS,
        variables: { id: user._id },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.getAllUserWords),
        catchError(() => of([]))
      );
  }

  create(word: Word): Observable<WordInfo> {
    return this.apollo
      .mutate<{ createWord: Word }>({
        mutation: CREATE_WORD,
        variables: { word },
      })
      .pipe(
        map(({ data }) => data?.createWord),
        catchError(() => of(null))
      );
  }

  addFavorite(user: User, word: Word): Observable<WordInfo> {
    return this.apollo
      .mutate({
        mutation: ADD_FAVORITE_WORD,
        variables: {
          id: user._id,
          wordId: word._id,
        },
      })
      .pipe(
        map(() => word),
        catchError(() => of(null))
      );
  }
}
