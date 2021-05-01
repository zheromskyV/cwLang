import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { MIN_PASSWORD_LENGTH } from 'src/app/constants/auth';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { RootState } from 'src/app/store/root.state';
import { dictionary } from '../../../constants/dictionary';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as UiActions from '../../../store/ui/ui.actions';
import * as fromUi from '../../../store/ui/ui.selectors';

@Component({
  selector: 'cwl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  dictionary = dictionary;
  icons = {
    login: PrimeIcons.USER,
    password: PrimeIcons.EYE_SLASH,
    signIn: PrimeIcons.SIGN_IN,
    signUp: PrimeIcons.PLUS,
  };

  formGroup: FormGroup;
  formFields = {
    login: 'login',
    password: 'password',
  };

  private readonly subscriptions = new Subscription();
  isLoginError: boolean;

  constructor(
    private readonly store: Store<RootState>,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.formFields.login]: ['', [Validators.required, Validators.email]],
      [this.formFields.password]: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
    });

    this.subscriptions.add(
      this.store.select(fromUi.getLoginError).subscribe((isError) => {
        this.isLoginError = isError;
      })
    );

    this.subscriptions.add(
      this.formGroup.valueChanges.pipe(filter(() => this.isLoginError)).subscribe(() => {
        this.store.dispatch(UiActions.setLoginError({ isLoginError: false }));
      })
    );
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  getFieldValue(field: string): any {
    return this.formGroup.controls[field].value;
  }

  signIn(): void {
    if (!this.isFormValid) {
      return;
    }

    const email = this.getFieldValue(this.formFields.login);
    const password = this.getFieldValue(this.formFields.password);

    this.store.dispatch(AuthActions.logIn({ email, password }));
  }

  signUp(): void {
    this.navigationService.navigateToSignUpPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
