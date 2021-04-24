import { Component, OnInit } from '@angular/core';

import { dictionary } from '../../../constants/dictionary';

@Component({
  selector: 'cwl-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  dictionary = dictionary;

  constructor() {}

  ngOnInit(): void {}
}
