import { Component, Input, OnInit } from '@angular/core';

import { dictionary } from 'src/app/constants/dictionary';
import { Words } from 'src/app/models/word';

@Component({
  selector: 'cwl-words-table',
  templateUrl: './words-table.component.html',
  styleUrls: ['./words-table.component.scss'],
})
export class WordsTableComponent implements OnInit {
  @Input() words: Words = [];

  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}
}
