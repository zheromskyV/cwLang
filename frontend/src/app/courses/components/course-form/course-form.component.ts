import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';

import { LANGUAGE_LEVEL_OPTIONS, LANGUAGE_OPTIONS } from 'src/app/constants/languages';
import { MIN_ABOUT_LENGTH, MIN_NAME_LENGTH } from 'src/app/constants/auth';
import { Course, CourseInfo } from 'src/app/models/course';
import { dictionary } from 'src/app/constants/dictionary';
import { Languages } from 'src/app/constants/languages.enum';
import { LanguageLevels } from 'src/app/constants/language-levels.enum';

@Component({
  selector: 'cwl-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
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
  };
  languages = LANGUAGE_OPTIONS;
  languageLevels = LANGUAGE_LEVEL_OPTIONS;

  formGroup: FormGroup;
  formFields = {
    title: 'title',
    lang: 'lang',
    level: 'level',
    price: 'price',
    info: 'info',
  };

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.formFields.title]: [this.course?.title, [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
      [this.formFields.lang]: [this.course?.language, [Validators.required]],
      [this.formFields.level]: [this.course?.level, [Validators.required]],
      [this.formFields.price]: [this.course?.price, [Validators.required]],
      [this.formFields.info]: [this.course?.info, [Validators.required, Validators.minLength(MIN_ABOUT_LENGTH)]],
    });
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  getFieldValue(field: string): any {
    return this.formGroup.controls[field].value;
  }

  save(): void {
    if (!this.isFormValid) {
      return;
    }

    const course: Course = {
      ...this.course,
      title: this.getFieldValue(this.formFields.title),
      language: this.getFieldValue(this.formFields.lang) as Languages,
      level: this.getFieldValue(this.formFields.level) as LanguageLevels,
      price: this.getFieldValue(this.formFields.price),
      info: this.getFieldValue(this.formFields.info),
      words: this.course?.words || [],
    };

    this.saveCourse.emit(course);
  }

  cancel(): void {
    this.cancelCourse.emit();
  }
}
