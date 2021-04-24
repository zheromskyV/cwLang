import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';

import { DEFAULT_USER, LANGUAGE_OPTIONS, ROLE_OPTIONS } from 'src/app/constants/auth';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { RootState } from 'src/app/store/root.state';
import { dictionary } from '../../../constants/dictionary';
import * as AuthActions from '../../../store/auth/auth.actions';

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

  constructor(private readonly store: Store<RootState>, private readonly navigationService: NavigationService) {}

  ngOnInit(): void {}

  submit(): void {
    this.store.dispatch(AuthActions.signUp({ user: this.user }));
  }

  back(): void {
    this.navigationService.navigateToLoginPage();
  }
}
