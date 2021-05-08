import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';

@NgModule({
  declarations: [GroupsPageComponent],
  imports: [SharedModule, GroupsRoutingModule],
})
export class GroupsModule {}
