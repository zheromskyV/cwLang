import { Component, OnInit } from '@angular/core';
import { dictionary } from 'src/app/constants/dictionary';

@Component({
  selector: 'cwl-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
})
export class SchedulePageComponent implements OnInit {
  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}
}
