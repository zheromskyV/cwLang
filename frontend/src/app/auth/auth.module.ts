import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';
import { CalendarModule } from 'primeng/calendar';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent, LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    InputTextareaModule,
    DropdownModule,
    KnobModule,
    CalendarModule,
  ],
})
export class AuthModule {}
