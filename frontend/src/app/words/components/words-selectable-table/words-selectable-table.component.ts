import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { dictionary } from 'src/app/constants/dictionary';
import { Words } from 'src/app/models/word';

@Component({
  selector: 'cwl-words-selectable-table',
  templateUrl: './words-selectable-table.component.html',
  styleUrls: ['./words-selectable-table.component.scss'],
})
export class WordsSelectableTableComponent implements OnInit {
  @Input() words: Words = [];

  @Input() selectedWords: Words = [];
  @Output() selectedWordsChange = new EventEmitter<Words>();

  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}
}
