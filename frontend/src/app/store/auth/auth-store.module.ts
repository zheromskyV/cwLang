import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { AuthEffects } from './auth.effects';
import { authReducer } from './auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Auth, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStoreModule {}
