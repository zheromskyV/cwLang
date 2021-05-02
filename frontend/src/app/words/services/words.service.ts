import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CREATE_WORD, GET_WORDS } from 'src/app/api/word';
import { Word, WordInfo, Words } from 'src/app/models/word';
import { Languages } from 'src/app/constants/languages.enum';

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
      })
      .pipe(
        map(({ data }) => data?.getWords),
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
}
