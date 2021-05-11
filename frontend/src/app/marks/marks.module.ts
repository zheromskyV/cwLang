import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MarksRoutingModule } from './marks-routing.module';
import { MarksPageComponent } from './pages/marks-page/marks-page.component';
import { AddMarkFormComponent } from './components/add-mark-form/add-mark-form.component';
import { ViewMarksComponent } from './components/view-marks/view-marks.component';

@NgModule({
  declarations: [MarksPageComponent, AddMarkFormComponent, ViewMarksComponent],
  imports: [SharedModule, MarksRoutingModule],
})
export class MarksModule {}
