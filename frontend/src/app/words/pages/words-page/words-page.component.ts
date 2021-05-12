import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PrimeIcons } from 'primeng/api';

import { dictionary } from 'src/app/constants/dictionary';
import { RootState } from 'src/app/store/root.state';
import { User } from 'src/app/models/user';
import { Word, Words } from 'src/app/models/word';
import * as WordsActions from '../../../store/words/words.actions';
import * as fromWords from '../../../store/words/words.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-words-page',
  templateUrl: './words-page.component.html',
  styleUrls: ['./words-page.component.scss'],
})
export class WordsPageComponent implements OnInit, OnDestroy {
  dictionary = dictionary;
  icons = {
    table: PrimeIcons.TABLE,
    favorite: PrimeIcons.STAR,
    download: PrimeIcons.DOWNLOAD,
  };

  studentWords$: Observable<Words>;
  favoriteWords$: Observable<Words>;

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(fromAuth.getUserInfo).subscribe((userInfo) => {
        this.store.dispatch(WordsActions.getStudentWords({ user: userInfo as User }));
        this.store.dispatch(WordsActions.getFavoriteWords({ user: userInfo as User }));
      })
    );

    this.studentWords$ = this.store.select(fromWords.getStudentWords);
    this.favoriteWords$ = this.store.select(fromWords.getFavoriteWords);
  }

  addToFavorites(word: Word): void {
    this.store.dispatch(WordsActions.addFavoriteWord({ word }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

    this.store.dispatch(WordsActions.clearStudentWords());
    this.store.dispatch(WordsActions.clearFavoriteWords());
  }

  downloadFile(): void {
    this.store.dispatch(WordsActions.downloadFavoriteWords());
  }
}
