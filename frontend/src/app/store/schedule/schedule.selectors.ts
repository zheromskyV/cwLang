import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { ScheduleState } from './schedule.state';
import { ScheduleEvents } from 'src/app/models/schedule';

const rootSelector = createFeatureSelector<ScheduleState>(StoreFeature.Schedule);

export const getEvents = createSelector(rootSelector, (state: ScheduleState): ScheduleEvents => state.events);
