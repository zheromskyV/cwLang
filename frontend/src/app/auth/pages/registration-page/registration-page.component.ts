import { Component, OnInit } from '@angular/core';

import { dictionary } from '../../../constants/dictionary';

@Component({
  selector: 'cwl-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}
}
