import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { StudentsEffects } from './students.effects';
import { studentsReducer } from './students.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Students, studentsReducer),
    EffectsModule.forFeature([StudentsEffects]),
  ],
})
export class StudentsStoreModule {}
