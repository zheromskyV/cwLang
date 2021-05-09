import _ from 'lodash';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService, PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';

import { MIN_ABOUT_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH, ROLE_OPTIONS } from 'src/app/constants/auth';
import { LANGUAGE_OPTIONS } from 'src/app/constants/languages';
import { Languages } from 'src/app/constants/languages.enum';
import { Roles } from 'src/app/constants/roles.enum';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { Language } from 'src/app/models/language';
import { User, UserInfo } from 'src/app/models/user';
import { RootState } from 'src/app/store/root.state';
import { dictionary } from '../../../constants/dictionary';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as UiActions from '../../../store/ui/ui.actions';

@Component({
  selector: 'cwl-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @Input() isProfilePage: boolean = false;
  @Input() isEditable: boolean = true;
  @Input() userInfo: UserInfo = null;

  @Output() stopEditing = new EventEmitter();

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

  isRegistrationError: boolean;
  isUpdateUserError: boolean;
  isUpdateUserSuccess: boolean;

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly store: Store<RootState>,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const disabled = this.isProfilePage;

    this.formGroup = this.formBuilder.group({
      [this.formFields.login]: [{ value: '', disabled }, [Validators.required, Validators.email]],
      [this.formFields.password]: [
        { value: '', disabled },
        [(Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH))],
      ],
      [this.formFields.role]: [{ value: null, disabled }, [Validators.required]],
      [this.formFields.nativeLang]: [{ value: null, disabled }, [Validators.required]],
      [this.formFields.birthday]: [{ value: null, disabled }, [(Validators.required, this.birthdayValidator)]],
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

    if (this.isProfilePage && this.userInfo) {
      this.prefillData();
    }
  }

  private getLangValueFromUser(langName: Languages): number {
    return this.userInfo?.profile?.languages.find(({ name }) => name === langName)?.value || 0;
  }

  private prefillData(): void {
    this.formGroup.controls[this.formFields.login].setValue(this.userInfo!.email);
    this.formGroup.controls[this.formFields.password].setValue(this.userInfo!.password);
    this.formGroup.controls[this.formFields.role].setValue(this.userInfo!.role);
    this.formGroup.controls[this.formFields.nativeLang].setValue(this.userInfo!.nativeLanguage);
    this.formGroup.controls[this.formFields.birthday].setValue(new Date(this.userInfo!.birthday));
    this.formGroup.controls[this.formFields.name].setValue(this.userInfo!.name);
    this.formGroup.controls[this.formFields.surname].setValue(this.userInfo!.surname);
    this.formGroup.controls[this.formFields.about].setValue(this.userInfo!.profile?.info);
    this.formGroup.controls[this.formFields.langs[Languages.Be]].setValue(this.getLangValueFromUser(Languages.Be));
    this.formGroup.controls[this.formFields.langs[Languages.Ch]].setValue(this.getLangValueFromUser(Languages.Ch));
    this.formGroup.controls[this.formFields.langs[Languages.En]].setValue(this.getLangValueFromUser(Languages.En));
    this.formGroup.controls[this.formFields.langs[Languages.Fr]].setValue(this.getLangValueFromUser(Languages.Fr));
    this.formGroup.controls[this.formFields.langs[Languages.Ge]].setValue(this.getLangValueFromUser(Languages.Ge));
    this.formGroup.controls[this.formFields.langs[Languages.It]].setValue(this.getLangValueFromUser(Languages.It));
    this.formGroup.controls[this.formFields.langs[Languages.Ru]].setValue(this.getLangValueFromUser(Languages.Ru));
    this.formGroup.controls[this.formFields.langs[Languages.Sp]].setValue(this.getLangValueFromUser(Languages.Sp));
    this.formGroup.controls[this.formFields.langs[Languages.Sw]].setValue(this.getLangValueFromUser(Languages.Sw));
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
      email: this.getFieldValue(this.formFields.login),
      password: this.getFieldValue(this.formFields.password),
      role: this.getFieldValue(this.formFields.role) as Roles,
      name: this.getFieldValue(this.formFields.name),
      surname: this.getFieldValue(this.formFields.surname),
      nativeLanguage: this.getFieldValue(this.formFields.nativeLang) as Languages,
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

    this.stopEditing.emit();
    this.store.dispatch(AuthActions.updateUser({ user }));
  }

  submit(): void {
    if (!this.isFormValid) {
      return;
    }

    this.store.dispatch(UiActions.setUpdateUserSuccess({ isUpdateUserSuccess: false }));

    this.isProfilePage ? this.updateUser() : this.signUp();
  }

  back(): void {
    if (this.isProfilePage) {
      this.prefillData();
      this.stopEditing.emit();
      return;
    }

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
