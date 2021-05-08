import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { AuthModule } from '../auth/auth.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [ProfilePageComponent, StatusBarComponent, ProfileComponent],
  imports: [ProfileRoutingModule, AuthModule],
})
export class ProfileModule {}
