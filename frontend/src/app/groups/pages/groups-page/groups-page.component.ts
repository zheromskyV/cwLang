import { Component, OnInit } from '@angular/core';

import { dictionary } from 'src/app/constants/dictionary';

@Component({
  selector: 'cwl-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
})
export class GroupsPageComponent implements OnInit {
  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}
}
