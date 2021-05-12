import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CREATE_GROUP, DELETE_GROUP, GET_GROUPS, GET_USER_GROUPS, UPDATE_GROUP } from 'src/app/api/group';
import { ADD_STUDENT_TO_GROUP } from 'src/app/api/student';
import { Group, GroupInfo, Groups } from 'src/app/models/group';
import { UtilsService } from 'src/app/utils/utils.service';
import { User, UserInfo } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private readonly apollo: Apollo) {}

  getAll(): Observable<Groups> {
    return this.apollo
      .query<{ getGroups: Groups }>({
        query: GET_GROUPS,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.getGroups),
        catchError(() => of([]))
      );
  }

  getUserGroups(user: User): Observable<Groups> {
    return this.apollo
      .query<{ getUserGroups: Groups }>({
        query: GET_USER_GROUPS,
        variables: { id: user._id },
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => data?.getUserGroups),
        catchError(() => of([]))
      );
  }

  create(group: Group): Observable<GroupInfo> {
    return this.apollo
      .mutate<{ createGroup: Group }>({
        mutation: CREATE_GROUP,
        variables: { group: this.prepareGroup(group) },
      })
      .pipe(
        map(({ data }) => data?.createGroup as GroupInfo),
        switchMap((groupInfo) =>
          forkJoin(group.students.map((student) => this.addStudentToGroup(student._id, groupInfo?._id))).pipe(
            switchMap(() => of(groupInfo))
          )
        ),
        catchError(() => of(null))
      );
  }

  update(group: Group): Observable<GroupInfo> {
    return this.apollo
      .mutate<{ updateGroup: Group }>({
        mutation: UPDATE_GROUP,
        variables: {
          id: group._id,
          group: this.prepareGroup(group),
        },
      })
      .pipe(
        map(({ data }) => data?.updateGroup),
        catchError(() => of(null))
      );
  }

  delete({ _id: id }: Group): Observable<string> {
    return this.apollo
      .mutate({
        mutation: DELETE_GROUP,
        variables: { id },
      })
      .pipe(
        map(() => id || ''),
        catchError(() => of(''))
      );
  }

  addStudentToGroup(userId: string = '', groupId: string = ''): Observable<UserInfo> {
    return this.apollo
      .mutate<{ addStudentToGroup: User }>({
        mutation: ADD_STUDENT_TO_GROUP,
        variables: { userId, groupId },
      })
      .pipe(
        map(({ data }) => data?.addStudentToGroup),
        catchError(() => of(null))
      );
  }

  private prepareGroup(group: Group): object {
    return {
      teacher: group.teacher._id,
      course: group.course._id,
      schedule: UtilsService.cleanObject(group.schedule),
    };
  }
}
