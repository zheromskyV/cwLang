import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WordsTableComponent } from './components/words-table/words-table.component';
import { WordsSelectionListComponent } from './components/words-selection-list/words-selection-list.component';

@NgModule({
  declarations: [WordsTableComponent, WordsSelectionListComponent],
  imports: [SharedModule],
  exports: [WordsTableComponent, WordsSelectionListComponent],
})
export class WordsModule {}
