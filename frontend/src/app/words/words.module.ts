import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WordsRoutingModule } from './words-routing.module';
import { WordsTableComponent } from './components/words-table/words-table.component';
import { WordsSelectionListComponent } from './components/words-selection-list/words-selection-list.component';
import { WordsPageComponent } from './pages/words-page/words-page.component';

@NgModule({
  declarations: [WordsTableComponent, WordsSelectionListComponent, WordsPageComponent],
  imports: [SharedModule, WordsRoutingModule],
  exports: [WordsTableComponent, WordsSelectionListComponent],
})
export class WordsModule {}
