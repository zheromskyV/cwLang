import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from './constants/router-paths';
import { UtilsService } from './utils/utils.service';

const routes: Routes = [
  UtilsService.defaultRedirect(routerPaths.auth),
  {
    path: routerPaths.auth,
    loadChildren: () => import('./auth/auth.module').then(({ AuthModule }) => AuthModule),
  },
  {
    path: routerPaths.notFound,
    loadChildren: () => import('./not-found/not-found.module').then(({ NotFoundModule }) => NotFoundModule),
  },
  {
    path: '**',
    redirectTo: routerPaths.notFound,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
