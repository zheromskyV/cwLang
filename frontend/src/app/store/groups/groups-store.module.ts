import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { GroupsEffects } from './groups.effects';
import { groupsReducer } from './groups.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Groups, groupsReducer),
    EffectsModule.forFeature([GroupsEffects]),
  ],
})
export class GroupsStoreModule {}
