import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { DEFAULT_USER, LANGUAGE_OPTIONS, ROLE_OPTIONS } from 'src/app/constants/auth';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { dictionary } from '../../../constants/dictionary';

@Component({
  selector: 'cwl-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    email: PrimeIcons.ENVELOPE,
    password: PrimeIcons.KEY,
    role: PrimeIcons.ANDROID,
    name: PrimeIcons.TAG,
    surname: PrimeIcons.TAGS,
    birthday: PrimeIcons.CALENDAR,
    signUp: PrimeIcons.CHECK,
    back: PrimeIcons.ANGLE_LEFT,
  };
  roles = ROLE_OPTIONS;
  languages = LANGUAGE_OPTIONS;

  user = DEFAULT_USER;

  constructor(private readonly navigationService: NavigationService) {}

  ngOnInit(): void {}

  submit(): void {}

  back(): void {
    this.navigationService.navigateToLoginPage();
  }
}
