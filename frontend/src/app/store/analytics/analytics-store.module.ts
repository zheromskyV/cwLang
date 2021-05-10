import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { AnalyticsEffects } from './analytics.effects';
import { analyticsReducer } from './analytics.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Analytics, analyticsReducer),
    EffectsModule.forFeature([AnalyticsEffects]),
  ],
})
export class AnalyticsStoreModule {}
