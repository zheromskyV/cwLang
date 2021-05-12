import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { dictionary } from 'src/app/constants/dictionary';
import { Word, Words } from 'src/app/models/word';

@Component({
  selector: 'cwl-words-table',
  templateUrl: './words-table.component.html',
  styleUrls: ['./words-table.component.scss'],
})
export class WordsTableComponent implements OnInit {
  @Input() words: Words = [];
  @Input() withFavorites: boolean = false;

  @Output() onAddToFavorites = new EventEmitter<Word>();

  dictionary = dictionary;
  icons = {
    favorite: PrimeIcons.STAR,
  };

  constructor() {}

  ngOnInit(): void {}

  addToFavorites(word: Word): void {
    this.onAddToFavorites.emit(word);
  }
}
