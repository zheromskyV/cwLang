import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';

@NgModule({
  declarations: [PaymentPageComponent],
  imports: [SharedModule, PaymentRoutingModule],
})
export class PaymentModule {}
