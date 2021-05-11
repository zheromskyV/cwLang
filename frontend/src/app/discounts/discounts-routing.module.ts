import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { DiscountsPageComponent } from './pages/discounts-page/discounts-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: DiscountsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountsRoutingModule {}
