import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { CoursesEffects } from './courses.effects';
import { coursesReducer } from './courses.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Courses, coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
  ],
})
export class CoursesStoreModule {}
