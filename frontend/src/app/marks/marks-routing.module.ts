import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { MarksPageComponent } from './pages/marks-page/marks-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: MarksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarksRoutingModule {}
