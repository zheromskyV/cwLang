import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: PaymentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
