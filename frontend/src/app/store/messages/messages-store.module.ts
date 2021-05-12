import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { MessagesEffects } from './messages.effects';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([MessagesEffects])],
})
export class MessagesStoreModule {}
