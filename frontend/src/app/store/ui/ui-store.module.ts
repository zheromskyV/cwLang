import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../store.enum';
import { uiReducer } from './ui.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(StoreFeature.Ui, uiReducer)],
})
export class UiStoreModule {}
