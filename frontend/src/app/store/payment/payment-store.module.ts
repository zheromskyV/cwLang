import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { PaymentEffects } from './payment.effects';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([PaymentEffects])],
})
export class PaymentStoreModule {}
