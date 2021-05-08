import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { WordsTableComponent } from './components/words-table/words-table.component';
import { WordsSelectionListComponent } from './components/words-selection-list/words-selection-list.component';

@NgModule({
  declarations: [WordsTableComponent, WordsSelectionListComponent],
  imports: [CommonModule, SharedModule],
  exports: [WordsTableComponent, WordsSelectionListComponent],
})
export class WordsModule {}
