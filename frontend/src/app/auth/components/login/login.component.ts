import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { RootState } from 'src/app/store/root.state';
import { dictionary } from '../../../constants/dictionary';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'cwl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    login: PrimeIcons.USER,
    password: PrimeIcons.EYE_SLASH,
    signIn: PrimeIcons.SIGN_IN,
    signUp: PrimeIcons.PLUS,
  };

  login = '';
  password = '';

  constructor(private readonly store: Store<RootState>, private readonly navigationService: NavigationService) {}

  ngOnInit(): void {}

  signIn(): void {
    this.store.dispatch(
      AuthActions.logIn({
        email: this.login,
        password: this.password,
      })
    );
  }

  signUp(): void {
    this.navigationService.navigateToSignUpPage();
  }
}
