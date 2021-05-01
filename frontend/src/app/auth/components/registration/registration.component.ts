import _ from 'lodash';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
import { User, UserInfo } from 'src/app/models/user';
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
  @Input() isProfilePage: boolean = false;
  @Input() isEditable: boolean = true;
  @Input() userInfo: UserInfo = null;

  @Output() cancel = new EventEmitter();

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
    save: PrimeIcons.CHECK,
    cancel: PrimeIcons.TIMES,
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
    const disabled = this.isProfilePage;

    this.formGroup = this.formBuilder.group({
      [this.formFields.login]: [{ value: this.userInfo?.email, disabled }, [Validators.required, Validators.email]],
      [this.formFields.password]: [
        { value: this.userInfo?.password, disabled },
        [(Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH))],
      ],
      [this.formFields.role]: [{ value: this.userInfo?.role, disabled }, [Validators.required]],
      [this.formFields.nativeLang]: [{ value: this.userInfo?.nativeLanguage, disabled }, [Validators.required]],
      [this.formFields.birthday]: [
        { value: new Date(this.userInfo?.birthday || 0), disabled },
        [(Validators.required, this.birthdayValidator)],
      ],
      [this.formFields.name]: [this.userInfo?.name, [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
      [this.formFields.surname]: [this.userInfo?.surname, [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
      [this.formFields.about]: [this.userInfo?.profile?.info, [Validators.minLength(MIN_ABOUT_LENGTH)]],
      [this.formFields.langs[Languages.Be]]: [this.getLangValueFromUser(Languages.Be), []],
      [this.formFields.langs[Languages.Ch]]: [this.getLangValueFromUser(Languages.Ch), []],
      [this.formFields.langs[Languages.En]]: [this.getLangValueFromUser(Languages.En), []],
      [this.formFields.langs[Languages.Fr]]: [this.getLangValueFromUser(Languages.Fr), []],
      [this.formFields.langs[Languages.Ge]]: [this.getLangValueFromUser(Languages.Ge), []],
      [this.formFields.langs[Languages.It]]: [this.getLangValueFromUser(Languages.It), []],
      [this.formFields.langs[Languages.Ru]]: [this.getLangValueFromUser(Languages.Ru), []],
      [this.formFields.langs[Languages.Sp]]: [this.getLangValueFromUser(Languages.Sp), []],
      [this.formFields.langs[Languages.Sw]]: [this.getLangValueFromUser(Languages.Sw), []],
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

  private getLangValueFromUser(langName: Languages): number {
    return this.userInfo?.profile?.languages.find(({ name }) => name === langName)?.value || 0;
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

    const role: Roles = selectedRole.value ?? selectedRole;

    return role !== Roles.Admin;
  }

  get isAboutSectionShown(): boolean {
    const selectedRole = this.getFieldValue(this.formFields.role);

    if (!selectedRole) {
      return false;
    }

    const role: Roles = selectedRole.value ?? selectedRole;

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

  private signUp(): void {
    const user: User = {
      _id: '',
      email: this.getFieldValue(this.formFields.login),
      password: this.getFieldValue(this.formFields.password),
      role: this.getFieldValue(this.formFields.role).value as Roles,
      name: this.getFieldValue(this.formFields.name),
      surname: this.getFieldValue(this.formFields.surname),
      nativeLanguage: this.getFieldValue(this.formFields.nativeLang).value as Languages,
      birthday: new Date(this.getFieldValue(this.formFields.birthday)).getTime(),
      profile: {
        languages: this.getLanguages(),
        info: this.getFieldValue(this.formFields.about) || null,
      },
    };

    this.store.dispatch(AuthActions.signUp({ user }));
  }

  private updateUser(): void {
    const user: User = {
      ...this.userInfo!,
      name: this.getFieldValue(this.formFields.name),
      surname: this.getFieldValue(this.formFields.surname),
      profile: {
        languages: this.getLanguages(),
        info: this.getFieldValue(this.formFields.about) || null,
      },
    };

    console.log(user);
  }

  submit(): void {
    if (!this.isFormValid) {
      return;
    }

    this.isProfilePage ? this.updateUser() : this.signUp();
  }

  back(): void {
    this.isProfilePage ? this.cancel.emit() : this.navigationService.navigateToLoginPage();
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
