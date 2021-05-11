import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ADD_MARK, GET_USER_MARKS } from 'src/app/api/mark';
import { UtilsService } from 'src/app/utils/utils.service';
import { Mark, MarkInfo, Marks } from 'src/app/models/marks';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  constructor(private readonly apollo: Apollo) {}

  get(user: User): Observable<Marks> {
    return this.apollo
      .query<{ getUserMarks: Marks }>({
        query: GET_USER_MARKS,
        variables: { userId: user._id },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.getUserMarks),
        catchError(() => of([]))
      );
  }

  add(user: User, mark: Mark): Observable<MarkInfo> {
    return this.apollo
      .mutate<{ addMark: Mark }>({
        mutation: ADD_MARK,
        variables: {
          userId: user._id,
          mark: UtilsService.cleanObject(mark),
        },
      })
      .pipe(
        map(({ data }) => data?.addMark),
        catchError(() => of(null))
      );
  }
}
