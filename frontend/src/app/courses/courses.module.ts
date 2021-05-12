import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WordsModule } from '../words/words.module';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CourseFormComponent } from './components/course-form/course-form.component';

@NgModule({
  declarations: [CoursesPageComponent, CoursesTableComponent, CourseFormComponent],
  imports: [SharedModule, CoursesRoutingModule, WordsModule],
})
export class CoursesModule {}
