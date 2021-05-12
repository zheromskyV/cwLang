import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';

@NgModule({
  declarations: [StudentsPageComponent, StudentsTableComponent],
  imports: [SharedModule, StudentsRoutingModule],
  exports: [StudentsTableComponent],
})
export class StudentsModule {}
