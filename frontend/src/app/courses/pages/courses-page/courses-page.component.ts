import { Component, OnInit } from '@angular/core';

import { dictionary } from 'src/app/constants/dictionary';

@Component({
  selector: 'cwl-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}
}
