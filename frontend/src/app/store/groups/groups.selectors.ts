import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { GroupsState } from './groups.state';
import { Groups } from 'src/app/models/group';

const rootSelector = createFeatureSelector<GroupsState>(StoreFeature.Groups);

export const getGroups = createSelector(rootSelector, (state: GroupsState): Groups => state.groups);
