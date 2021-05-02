import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';

@NgModule({
  declarations: [CoursesPageComponent, CoursesTableComponent],
  imports: [SharedModule, CoursesRoutingModule],
})
export class CoursesModule {}
