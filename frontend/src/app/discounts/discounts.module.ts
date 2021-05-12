import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DiscountsRoutingModule } from './discounts-routing.module';
import { DiscountsPageComponent } from './pages/discounts-page/discounts-page.component';

@NgModule({
  declarations: [DiscountsPageComponent],
  imports: [SharedModule, DiscountsRoutingModule],
})
export class DiscountsModule {}
