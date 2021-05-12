import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { ScheduleEffects } from './schedule.effects';
import { scheduleReducer } from './schedule.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Schedule, scheduleReducer),
    EffectsModule.forFeature([ScheduleEffects]),
  ],
})
export class ScheduleStoreModule {}
