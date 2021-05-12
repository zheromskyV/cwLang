import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { dictionary } from 'src/app/constants/dictionary';
import { Words } from 'src/app/models/word';

@Component({
  selector: 'cwl-words-selection-list',
  templateUrl: './words-selection-list.component.html',
  styleUrls: ['./words-selection-list.component.scss'],
})
export class WordsSelectionListComponent implements OnInit {
  @Input() sourceWords: Words = [];
  @Output() sourceWordsChange = new EventEmitter<Words>();

  @Input() targetWords: Words = [];
  @Output() targetWordsChange = new EventEmitter<Words>();

  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}

  moveToTarget(words: Words): void {
    this.targetWords = [...this.targetWords, ...words];
    this.sourceWords = this.sourceWords.filter((word) => !words.includes(word));
    this.emitWords();
  }

  moveToSource(words: Words): void {
    this.sourceWords = [...this.sourceWords, ...words];
    this.targetWords = this.targetWords.filter((word) => !words.includes(word));
    this.emitWords();
  }

  private emitWords(): void {
    this.sourceWordsChange.emit(this.sourceWords);
    this.targetWordsChange.emit(this.targetWords);
  }
}
