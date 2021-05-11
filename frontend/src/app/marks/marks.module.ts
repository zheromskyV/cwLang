import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarksRoutingModule } from './marks-routing.module';
import { MarksPageComponent } from './pages/marks-page/marks-page.component';
import { AddMarkFormComponent } from './components/add-mark-form/add-mark-form.component';
import { ViewMarksComponent } from './components/view-marks/view-marks.component';

@NgModule({
  declarations: [MarksPageComponent, AddMarkFormComponent, ViewMarksComponent],
  imports: [CommonModule, MarksRoutingModule],
})
export class MarksModule {}
