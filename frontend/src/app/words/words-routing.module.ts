import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { WordsPageComponent } from './pages/words-page/words-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: WordsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordsRoutingModule {}
