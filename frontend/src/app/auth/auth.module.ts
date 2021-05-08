import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent, LoginComponent, RegistrationComponent],
  imports: [AuthRoutingModule, SharedModule],
  exports: [RegistrationComponent, SharedModule],
})
export class AuthModule {}
