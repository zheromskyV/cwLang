import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: CoursesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
