import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PrimeIcons } from 'primeng/api';

import { RootState } from 'src/app/store/root.state';
import { dictionary } from 'src/app/constants/dictionary';
import { User } from 'src/app/models/user';
import { Group, GroupInfo, Groups } from 'src/app/models/group';
import * as AnalyticsActions from '../../../store/analytics/analytics.actions';
import * as fromAnalytics from '../../../store/analytics/analytics.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';
import * as fromGroups from '../../../store/groups/groups.selectors';
import * as GroupsActions from '../../../store/groups/groups.actions';

@Component({
  selector: 'cwl-teacher-analytics',
  templateUrl: './teacher-analytics.component.html',
  styleUrls: ['./teacher-analytics.component.scss'],
})
export class TeacherAnalyticsComponent implements OnInit {
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
  colors = ['#FFEC21', '#378AFF', '#FFA32F', '#F54F52', '#93F03B', '#9552EA', '#FF6384', '#36A2EB', '#FFCE56'];
  dictionary = dictionary;
  icons = {
    load: PrimeIcons.CLOUD_DOWNLOAD,
  };

  data$: Observable<any>;
  groups$: Observable<Groups>;
  selectedGroup: GroupInfo;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.getUserInfo), take(1)).subscribe((userInfo) => {
      this.store.dispatch(GroupsActions.getUserGroups({ user: userInfo as User }));
    });

    this.groups$ = this.store.select(fromGroups.getGroups);

    this.data$ = this.store.select(fromAnalytics.getStudentMarksForTeacherAnalytics).pipe(
      map((students) => ({
        labels: Array.from({ length: Math.max(...students.map(({ marks }) => marks.length)) }, (_, i) => i + 1),
        datasets: students.map(({ fullname, marks }, i) => ({
          label: fullname,
          data: [...marks],
          fill: false,
          borderColor: this.colors[i % this.colors.length],
        })),
      }))
    );
  }

  loadData(): void {
    this.store.dispatch(AnalyticsActions.getStudentMarksForTeacherAnalytics({ group: this.selectedGroup as Group }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(GroupsActions.clearGroups());
    this.store.dispatch(AnalyticsActions.clearAnalytics());
  }
}
