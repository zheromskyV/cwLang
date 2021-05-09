import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: GroupsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
