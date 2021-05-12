import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { dictionary } from 'src/app/constants/dictionary';
import { RootState } from 'src/app/store/root.state';
import { User } from 'src/app/models/user';
import { Mark, Marks } from 'src/app/models/marks';
import * as MarksActions from '../../../store/marks/marks.actions';
import * as fromMarks from '../../../store/marks/marks.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'cwl-view-marks',
  templateUrl: './view-marks.component.html',
  styleUrls: ['./view-marks.component.scss'],
})
export class ViewMarksComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    download: PrimeIcons.DOWNLOAD,
  };

  marks$: Observable<Marks>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.getUserInfo), take(1)).subscribe((userInfo) => {
      this.store.dispatch(MarksActions.getMarks({ user: userInfo as User }));
    });

    this.marks$ = this.store.select(fromMarks.getMarks);
  }

  getMark({ value }: Mark): string {
    return `${dictionary.testingMark} ${value}`;
  }

  getComment({ message }: Mark): string {
    return `${dictionary.testingComment} ${message}`;
  }

  downloadFile(): void {
    this.store.dispatch(MarksActions.downloadMarks());
  }
}
