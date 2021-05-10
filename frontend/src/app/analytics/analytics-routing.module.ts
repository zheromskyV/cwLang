import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: AnalyticsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
