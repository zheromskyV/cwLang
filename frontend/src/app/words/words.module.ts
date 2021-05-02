import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { WordsTableComponent } from './components/words-table/words-table.component';

@NgModule({
  declarations: [WordsTableComponent],
  imports: [CommonModule, SharedModule],
  exports: [WordsTableComponent],
})
export class WordsModule {}
