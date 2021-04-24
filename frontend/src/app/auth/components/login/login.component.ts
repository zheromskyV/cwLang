import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { dictionary } from '../../../constants/dictionary';

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
    signIn: PrimeIcons.UNLOCK,
    signUp: PrimeIcons.PLUS,
  };

  login = '';
  password = '';

  constructor(private readonly navigationService: NavigationService) {}

  ngOnInit(): void {}

  signIn(): void {}

  signUp(): void {
    this.navigationService.navigateToSignUpPage();
  }
}
