import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { TeachersPageComponent } from './pages/teachers-page/teachers-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: TeachersPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
