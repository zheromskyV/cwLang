import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthStoreModule } from './auth/auth-store.module';
import { CoursesStoreModule } from './courses/courses-store.module';
import { GroupsStoreModule } from './groups/groups-store.module';
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
    AuthStoreModule,
    CoursesStoreModule,
    GroupsStoreModule,
    StudentsStoreModule,
    TeachersStoreModule,
    UiStoreModule,
    WordsStoreModule,
  ],
})
export class RootStoreModule {}
