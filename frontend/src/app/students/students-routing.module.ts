import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { StudentsPageComponent } from './pages/students-page/students-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: StudentsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
