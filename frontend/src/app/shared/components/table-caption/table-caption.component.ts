import { Component, Input, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { Table } from 'primeng/table';

import { dictionary } from 'src/app/constants/dictionary';

@Component({
  selector: 'cwl-table-caption',
  templateUrl: './table-caption.component.html',
  styleUrls: ['./table-caption.component.scss'],
})
export class TableCaptionComponent implements OnInit {
  @Input() table: Table;

  dictionary = dictionary;
  icons = {
    clearFilters: PrimeIcons.FILTER_SLASH,
    search: PrimeIcons.SEARCH,
  };

  constructor() {}

  ngOnInit(): void {}
}
