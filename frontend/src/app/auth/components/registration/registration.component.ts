import _ from 'lodash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  LANGUAGE_OPTIONS,
  MIN_ABOUT_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  ROLE_OPTIONS,
} from 'src/app/constants/auth';
import { Languages } from 'src/app/constants/languages.enum';
import { Roles } from 'src/app/constants/roles.enum';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { Language } from 'src/app/models/language';
import { User } from 'src/app/models/user';
import { RootState } from 'src/app/store/root.state';
import { dictionary } from '../../../constants/dictionary';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as UiActions from '../../../store/ui/ui.actions';
import * as fromUi from '../../../store/ui/ui.selectors';

@Component({
  selector: 'cwl-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
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

  formGroup: FormGroup;
  formFields = {
    login: 'login',
    password: 'password',
    role: 'role',
    nativeLang: 'nativeLang',
    birthday: 'birthday',
    name: 'name',
    surname: 'surname',
    about: 'about',
    langs: {
      [Languages.Be]: 'Languages.Be',
      [Languages.Ch]: 'Languages.Ch',
      [Languages.En]: 'Languages.En',
      [Languages.Fr]: 'Languages.Fr',
      [Languages.Ge]: 'Languages.Ge',
      [Languages.It]: 'Languages.It',
      [Languages.Ru]: 'Languages.Ru',
      [Languages.Sp]: 'Languages.Sp',
      [Languages.Sw]: 'Languages.Sw',
      [Languages.UN]: '-',
    },
  };

  private readonly subscriptions = new Subscription();
  isRegistrationError: boolean;

  constructor(
    private readonly store: Store<RootState>,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.formFields.login]: ['', [Validators.required, Validators.email]],
      [this.formFields.password]: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
      [this.formFields.role]: [null, [Validators.required]],
      [this.formFields.nativeLang]: [null, [Validators.required]],
      [this.formFields.birthday]: [null, [Validators.required, this.birthdayValidator]],
      [this.formFields.name]: ['', [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
      [this.formFields.surname]: ['', [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
      [this.formFields.about]: ['', [Validators.minLength(MIN_ABOUT_LENGTH)]],
      [this.formFields.langs[Languages.Be]]: [0, []],
      [this.formFields.langs[Languages.Ch]]: [0, []],
      [this.formFields.langs[Languages.En]]: [0, []],
      [this.formFields.langs[Languages.Fr]]: [0, []],
      [this.formFields.langs[Languages.Ge]]: [0, []],
      [this.formFields.langs[Languages.It]]: [0, []],
      [this.formFields.langs[Languages.Ru]]: [0, []],
      [this.formFields.langs[Languages.Sp]]: [0, []],
      [this.formFields.langs[Languages.Sw]]: [0, []],
    });

    this.subscriptions.add(
      this.store.select(fromUi.getRegistrationError).subscribe((isError) => {
        this.isRegistrationError = isError;
      })
    );

    this.subscriptions.add(
      this.formGroup.valueChanges.pipe(filter(() => this.isRegistrationError)).subscribe(() => {
        this.store.dispatch(UiActions.setRegistrationError({ isRegistrationError: false }));
      })
    );
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  getFieldValue(field: string): any {
    return this.formGroup.controls[field].value;
  }

  get isLanguageSectionShown(): boolean {
    const selectedRole = this.getFieldValue(this.formFields.role);

    if (!selectedRole) {
      return false;
    }

    const role = selectedRole.value as Roles;

    return role !== Roles.Admin;
  }

  get isAboutSectionShown(): boolean {
    const selectedRole = this.getFieldValue(this.formFields.role);

    if (!selectedRole) {
      return false;
    }

    const role = selectedRole.value as Roles;

    return role === Roles.Teacher;
  }

  getLanguages(): Language[] {
    return _.compact(
      Object.keys(this.formFields.langs).map((lang) =>
        lang !== Languages.UN
          ? ({
              name: lang,
              value: this.getFieldValue(this.formFields.langs[lang as Languages]),
            } as Language)
          : null
      )
    );
  }

  submit(): void {
    if (!this.isFormValid) {
      return;
    }

    const user: User = {
      _id: '',
      email: this.getFieldValue(this.formFields.login),
      password: this.getFieldValue(this.formFields.password),
      role: this.getFieldValue(this.formFields.role).value as Roles,
      name: this.getFieldValue(this.formFields.name),
      surname: this.getFieldValue(this.formFields.surname),
      birthday: new Date(this.getFieldValue(this.formFields.birthday)).getTime(),
      profile: {
        nativeLanguage: this.getFieldValue(this.formFields.nativeLang).value as Languages,
        languages: this.getLanguages(),
        info: this.getFieldValue(this.formFields.about) || null,
      },
    };

    this.store.dispatch(AuthActions.signUp({ user }));
  }

  back(): void {
    this.navigationService.navigateToLoginPage();
  }

  private birthdayValidator({ value }: FormControl): ValidationErrors | null {
    if (!value) {
      return null;
    }

    const birthday = new Date(value).getTime();
    const now = Date.now();

    return now < birthday ? { error: 'Incorrect date' } : null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
