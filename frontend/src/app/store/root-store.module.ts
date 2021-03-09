import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthStoreModule } from './auth/auth-store.module';

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
  ],
})
export class RootStoreModule {}
