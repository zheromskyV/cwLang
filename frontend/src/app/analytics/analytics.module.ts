import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { SharedModule } from '../shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';
import { AdminAnalyticsComponent } from './components/admin-analytics/admin-analytics.component';
import { TeacherAnalyticsComponent } from './components/teacher-analytics/teacher-analytics.component';
import { StudentAnalyticsComponent } from './components/student-analytics/student-analytics.component';

@NgModule({
  declarations: [AnalyticsPageComponent, AdminAnalyticsComponent, TeacherAnalyticsComponent, StudentAnalyticsComponent],
  imports: [ChartModule, SharedModule, AnalyticsRoutingModule],
})
export class AnalyticsModule {}
