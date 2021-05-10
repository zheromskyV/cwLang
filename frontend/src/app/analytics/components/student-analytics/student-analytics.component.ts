import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { RootState } from 'src/app/store/root.state';
import { User } from 'src/app/models/user';
import * as AnalyticsActions from '../../../store/analytics/analytics.actions';
import * as fromAnalytics from '../../../store/analytics/analytics.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';
import { dictionary } from 'src/app/constants/dictionary';

@Component({
  selector: 'cwl-student-analytics',
  templateUrl: './student-analytics.component.html',
  styleUrls: ['./student-analytics.component.scss'],
})
export class StudentAnalyticsComponent implements OnInit, OnDestroy {
  OPTIONS = {
    legend: {
      labels: {
        fontColor: '#495057',
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: '#495057',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#495057',
          },
        },
      ],
    },
  };
  dictionary = dictionary;

  data$: Observable<any>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.getUserInfo), take(1)).subscribe((userInfo) => {
      this.store.dispatch(AnalyticsActions.getStudentMarksAnalytics({ user: userInfo as User }));
    });

    this.data$ = this.store.select(fromAnalytics.getStudentMarksAnalytics).pipe(
      map((marks) => ({
        labels: Array.from({ length: marks.length }, (_, i) => i + 1),
        datasets: [
          {
            label: this.dictionary.myMarks,
            data: [...marks],
            fill: true,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
          },
        ],
      }))
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AnalyticsActions.clearAnalytics());
  }
}
