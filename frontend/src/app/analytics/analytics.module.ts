import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { SharedModule } from '../shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';

@NgModule({
  declarations: [AnalyticsPageComponent],
  imports: [ChartModule, SharedModule, AnalyticsRoutingModule],
})
export class AnalyticsModule {}
