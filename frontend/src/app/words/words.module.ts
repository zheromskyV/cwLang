import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { WordsTableComponent } from './components/words-table/words-table.component';
import { WordsSelectableTableComponent } from './components/words-selectable-table/words-selectable-table.component';

@NgModule({
  declarations: [WordsTableComponent, WordsSelectableTableComponent],
  imports: [CommonModule, SharedModule],
  exports: [WordsTableComponent, WordsSelectableTableComponent],
})
export class WordsModule {}
