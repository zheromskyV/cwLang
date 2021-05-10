import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';
import { GroupsTableComponent } from './components/groups-table/groups-table.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teachers/teachers.module';

@NgModule({
  declarations: [GroupsPageComponent, GroupsTableComponent, GroupFormComponent],
  imports: [SharedModule, GroupsRoutingModule, StudentsModule, TeachersModule],
})
export class GroupsModule {}
