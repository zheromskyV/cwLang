import { Component, OnInit } from '@angular/core';

import { dictionary } from 'src/app/constants/dictionary';

@Component({
  selector: 'cwl-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements OnInit {
  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}
}
