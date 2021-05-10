import { createAction, props } from '@ngrx/store';

import { Group, Groups } from 'src/app/models/group';
import { User } from 'src/app/models/user';

export const getGroups = createAction('[GROUPS] GET_GROUPS');

export const getUserGroups = createAction('[GROUPS] GET_USER_GROUPS', props<{ user: User }>());

export const setGroups = createAction('[GROUPS] SET_GROUPS', props<{ groups: Groups }>());

export const addGroup = createAction('[GROUPS] ADD_GROUP', props<{ group: Group }>());

export const updateGroup = createAction('[GROUPS] UPDATE_GROUP', props<{ group: Group }>());

export const deleteGroup = createAction('[GROUPS] DELETE_GROUP', props<{ group: Group }>());

export const clearGroups = createAction('[GROUPS] CLEAR_GROUPS');
