import { Action, createReducer, on } from '@ngrx/store';

import { GroupsState, initialGroupsState } from './groups.state';
import * as GroupsActions from './groups.actions';

const reducer = createReducer(
  initialGroupsState,
  on(GroupsActions.setGroups, (state, { groups }) => ({
    ...state,
    groups,
  })),
  on(GroupsActions.clearGroups, (state) => ({
    ...state,
    groups: [],
  }))
);

export function groupsReducer(state: GroupsState | undefined, action: Action) {
  return reducer(state, action);
}
