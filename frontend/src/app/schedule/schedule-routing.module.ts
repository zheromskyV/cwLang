import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: SchedulePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
