import _ from 'lodash';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrimeIcons } from 'primeng/api';

import { LANGUAGE_LEVEL_OPTIONS, LANGUAGE_OPTIONS } from 'src/app/constants/languages';
import { MIN_ABOUT_LENGTH, MIN_NAME_LENGTH } from 'src/app/constants/auth';
import { Course, CourseInfo } from 'src/app/models/course';
import { dictionary } from 'src/app/constants/dictionary';
import { Languages } from 'src/app/constants/languages.enum';
import { LanguageLevels } from 'src/app/constants/language-levels.enum';
import { Words } from 'src/app/models/word';
import { RootState } from 'src/app/store/root.state';
import * as WordsActions from '../../../store/words/words.actions';
import * as fromWords from '../../../store/words/words.selectors';

@Component({
  selector: 'cwl-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  @Input() course: CourseInfo;

  @Output() saveCourse = new EventEmitter<Course>();
  @Output() cancelCourse = new EventEmitter();

  dictionary = dictionary;
  icons = {
    title: PrimeIcons.TAG,
    increment: PrimeIcons.PLUS,
    decrement: PrimeIcons.MINUS,
    save: PrimeIcons.CHECK,
    cancel: PrimeIcons.TIMES,
    load: PrimeIcons.CLOUD_DOWNLOAD,
  };
  languages = LANGUAGE_OPTIONS;
  languageLevels = LANGUAGE_LEVEL_OPTIONS;

  formGroup: FormGroup;
  formFields = {
    title: 'title',
    initialLang: 'initialLang',
    targetLang: 'targetLang',
    level: 'level',
    price: 'price',
    info: 'info',
  };

  sourceWords: Words = [];
  targetWords: Words = [];

  private readonly subscriptions = new Subscription();

  constructor(private readonly formBuilder: FormBuilder, private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.formFields.title]: [this.course?.title, [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
      [this.formFields.initialLang]: [this.course?.initialLang, [Validators.required]],
      [this.formFields.targetLang]: [this.course?.targetLang, [Validators.required]],
      [this.formFields.level]: [this.course?.level, [Validators.required]],
      [this.formFields.price]: [this.course?.price ?? 0, [Validators.required]],
      [this.formFields.info]: [this.course?.info, [Validators.required, Validators.minLength(MIN_ABOUT_LENGTH)]],
    });

    this.targetWords = this.course?.words || [];

    this.subscriptions.add(
      this.store
        .select(fromWords.getWords)
        .pipe(map((words) => _.differenceWith(words, this.targetWords, _.isEqual)))
        .subscribe((words) => {
          this.sourceWords = words;
        })
    );
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  getFieldValue(field: string): any {
    return this.formGroup.controls[field].value;
  }

  get isLanguagesSelected(): boolean {
    return this.getFieldValue(this.formFields.initialLang) && this.getFieldValue(this.formFields.targetLang);
  }

  loadWords(): void {
    this.store.dispatch(
      WordsActions.getWords({
        initialLang: this.getFieldValue(this.formFields.initialLang),
        targetLang: this.getFieldValue(this.formFields.targetLang),
      })
    );
  }

  save(): void {
    if (!this.isFormValid) {
      return;
    }

    const course: Course = {
      ...this.course,
      title: this.getFieldValue(this.formFields.title),
      initialLang: this.getFieldValue(this.formFields.initialLang) as Languages,
      targetLang: this.getFieldValue(this.formFields.targetLang) as Languages,
      level: this.getFieldValue(this.formFields.level) as LanguageLevels,
      price: this.getFieldValue(this.formFields.price),
      info: this.getFieldValue(this.formFields.info),
      words: this.targetWords,
    };

    this.store.dispatch(WordsActions.clearWords());
    this.saveCourse.emit(course);
  }

  cancel(): void {
    this.store.dispatch(WordsActions.clearWords());
    this.cancelCourse.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(WordsActions.clearWords());
  }
}
