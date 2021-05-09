import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { TeachersEffects } from './teachers.effects';
import { teachersReducer } from './teachers.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Teachers, teachersReducer),
    EffectsModule.forFeature([TeachersEffects]),
  ],
})
export class TeachersStoreModule {}
