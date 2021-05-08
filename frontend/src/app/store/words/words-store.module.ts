import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { WordsEffects } from './words.effects';
import { wordsReducer } from './words.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Words, wordsReducer),
    EffectsModule.forFeature([WordsEffects]),
  ],
})
export class WordsStoreModule {}
