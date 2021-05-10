import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersPageComponent } from './pages/teachers-page/teachers-page.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { RateTeacherComponent } from './components/rate-teacher/rate-teacher.component';

@NgModule({
  declarations: [TeachersPageComponent, TeachersTableComponent, RateTeacherComponent],
  imports: [SharedModule, TeachersRoutingModule],
  exports: [RateTeacherComponent],
})
export class TeachersModule {}
