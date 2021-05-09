import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';

import { dictionary } from 'src/app/constants/dictionary';
import { LANGUAGE_OPTIONS } from 'src/app/constants/languages';
import { Languages } from 'src/app/constants/languages.enum';
import { Word } from 'src/app/models/word';

@Component({
  selector: 'cwl-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
})
export class WordFormComponent implements OnInit {
  @Input() initialLang: Languages;
  @Input() targetLang: Languages;

  @Output() saveWord = new EventEmitter<Word>();
  @Output() cancelWord = new EventEmitter();

  dictionary = dictionary;
  icons = {
    save: PrimeIcons.CHECK,
    cancel: PrimeIcons.TIMES,
  };
  languages = LANGUAGE_OPTIONS;

  formGroup: FormGroup;
  formFields = {
    initialLang: 'initialLang',
    targetLang: 'targetLang',
    initial: 'initial',
    target: 'target',
  };

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.formFields.initialLang]: [{ value: this.initialLang, disabled: true }, [Validators.required]],
      [this.formFields.targetLang]: [{ value: this.targetLang, disabled: true }, [Validators.required]],
      [this.formFields.initial]: ['', [Validators.required]],
      [this.formFields.target]: ['', [Validators.required]],
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

    const word: Word = {
      initial: this.getFieldValue(this.formFields.initial),
      target: this.getFieldValue(this.formFields.target),
      initialLang: this.initialLang,
      targetLang: this.targetLang,
    };

    this.saveWord.emit(word);
  }

  cancel(): void {
    this.cancelWord.emit();
  }
}
