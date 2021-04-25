import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from './constants/router-paths';

const routes: Routes = [
  {
    path: routerPaths.home,
    loadChildren: () => import('./profile/profile.module').then(({ ProfileModule }) => ProfileModule),
  },
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
