import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: MessagesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
