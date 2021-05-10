import { NgModule } from '@angular/core';
import { FullCalendarModule } from 'primeng/fullcalendar';

import { SharedModule } from '../shared/shared.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';

@NgModule({
  declarations: [SchedulePageComponent, ScheduleCalendarComponent],
  imports: [SharedModule, FullCalendarModule, ScheduleRoutingModule],
})
export class ScheduleModule {}
