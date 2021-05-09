import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersPageComponent } from './pages/teachers-page/teachers-page.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';

@NgModule({
  declarations: [TeachersPageComponent, TeachersTableComponent],
  imports: [SharedModule, TeachersRoutingModule],
})
export class TeachersModule {}
