import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GET_USER_SCHEDULE } from 'src/app/api/schedule';
import { ScheduleEvents } from 'src/app/models/schedule';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private readonly apollo: Apollo) {}

  get(user: User): Observable<ScheduleEvents> {
    return this.apollo
      .query<{ getUserSchedule: ScheduleEvents }>({
        query: GET_USER_SCHEDULE,
        variables: { id: user._id },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.getUserSchedule),
        catchError(() => of([]))
      );
  }
}
