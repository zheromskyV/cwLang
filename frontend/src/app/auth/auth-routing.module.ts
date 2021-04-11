import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { UtilsService } from '../utils/utils.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

const routes: Routes = [
  UtilsService.defaultRedirect(routerPaths.login),
  {
    path: routerPaths.login,
    component: LoginPageComponent,
  },
  {
    path: routerPaths.registration,
    component: RegistrationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
