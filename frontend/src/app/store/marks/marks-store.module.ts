import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { MarksEffects } from './marks.effects';
import { marksReducer } from './marks.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Marks, marksReducer),
    EffectsModule.forFeature([MarksEffects]),
  ],
})
export class MarksStoreModule {}
