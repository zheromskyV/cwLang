import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { dictionary } from 'src/app/constants/dictionary';
import { ScheduleEvents } from 'src/app/models/schedule';
import { RootState } from 'src/app/store/root.state';
import { User } from 'src/app/models/user';
import * as ScheduleActions from '../../../store/schedule/schedule.actions';
import * as fromSchedule from '../../../store/schedule/schedule.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
})
export class SchedulePageComponent implements OnInit, OnDestroy {
  dictionary = dictionary;

  events$: Observable<ScheduleEvents>;

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(fromAuth.getUserInfo).subscribe((userInfo) => {
        this.store.dispatch(ScheduleActions.getEvents({ user: userInfo as User }));
      })
    );

    this.events$ = this.store.select(fromSchedule.getEvents);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(ScheduleActions.clearEvents());
  }
}
