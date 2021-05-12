import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AnalyticsStoreModule } from './analytics/analytics-store.module';
import { AuthStoreModule } from './auth/auth-store.module';
import { CoursesStoreModule } from './courses/courses-store.module';
import { GroupsStoreModule } from './groups/groups-store.module';
import { MarksStoreModule } from './marks/marks-store.module';
import { MessagesStoreModule } from './messages/messages-store.module';
import { PaymentStoreModule } from './payment/payment-store.module';
import { ScheduleStoreModule } from './schedule/schedule-store.module';
import { StudentsStoreModule } from './students/students-store.module';
import { TeachersStoreModule } from './teachers/teachers-store.module';
import { UiStoreModule } from './ui/ui-store.module';
import { WordsStoreModule } from './words/words-store.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AnalyticsStoreModule,
    AuthStoreModule,
    CoursesStoreModule,
    GroupsStoreModule,
    MarksStoreModule,
    MessagesStoreModule,
    PaymentStoreModule,
    ScheduleStoreModule,
    StudentsStoreModule,
    TeachersStoreModule,
    UiStoreModule,
    WordsStoreModule,
  ],
})
export class RootStoreModule {}
