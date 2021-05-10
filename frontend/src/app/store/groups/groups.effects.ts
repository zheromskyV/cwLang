import _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from '../root.state';
import { GroupsService } from 'src/app/groups/services/groups.service';
import { Group } from 'src/app/models/group';
import * as GroupsActions from './groups.actions';
import * as fromGroups from './groups.selectors';
import * as UiActions from '../ui/ui.actions';

@Injectable()
export class GroupsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<RootState>,
    private readonly groupsService: GroupsService
  ) {}

  getGroups$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.getGroups),
      switchMap(() => this.groupsService.getAll()),
      switchMap((groups) => [GroupsActions.setGroups({ groups })])
    )
  );

  getUserGroups$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.getUserGroups),
      switchMap(({ user }) => this.groupsService.getUserGroups(user)),
      switchMap((groups) => [GroupsActions.setGroups({ groups })])
    )
  );

  addGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.addGroup),
      switchMap(({ group }) => this.groupsService.create(group)),
      withLatestFrom(this.store.select(fromGroups.getGroups)),
      switchMap(([groupInfo, oldGroups]) =>
        _.isEmpty(groupInfo)
          ? [UiActions.setGeneralError({ isGeneralError: true })]
          : [
              GroupsActions.setGroups({ groups: [...oldGroups, groupInfo as Group] }),
              UiActions.setGeneralSuccess({ isGeneralSuccess: true }),
            ]
      )
    )
  );

  updateGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.updateGroup),
      switchMap(({ group }) => this.groupsService.update(group)),
      withLatestFrom(this.store.select(fromGroups.getGroups)),
      switchMap(([groupInfo, oldGroups]) =>
        _.isEmpty(groupInfo)
          ? [UiActions.setGeneralError({ isGeneralError: true })]
          : [
              GroupsActions.setGroups({
                groups: oldGroups.map((currGroup) => ({
                  ...currGroup,
                  ...(currGroup._id === groupInfo!._id && groupInfo),
                })),
              }),
              UiActions.setGeneralSuccess({ isGeneralSuccess: true }),
            ]
      )
    )
  );

  deleteGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.deleteGroup),
      switchMap(({ group }) => this.groupsService.delete(group)),
      withLatestFrom(this.store.select(fromGroups.getGroups)),
      switchMap(([deletedId, oldGroups]) =>
        _.isEmpty(deletedId)
          ? [UiActions.setGeneralError({ isGeneralError: true })]
          : [
              GroupsActions.setGroups({ groups: oldGroups.filter(({ _id }) => _id !== deletedId) }),
              UiActions.setGeneralSuccess({ isGeneralSuccess: true }),
            ]
      )
    )
  );
}
