import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { dictionary } from 'src/app/constants/dictionary';
import { MIN_ABOUT_LENGTH } from 'src/app/constants/auth';
import { UserInfo } from 'src/app/models/user';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'cwl-rate-teacher',
  templateUrl: './rate-teacher.component.html',
  styleUrls: ['./rate-teacher.component.scss'],
})
export class RateTeacherComponent implements OnInit {
  @Input() teacher: UserInfo;

  @Output() saveRate = new EventEmitter<Rating>();
  @Output() cancelRate = new EventEmitter();

  dictionary = dictionary;
  icons = {
    save: PrimeIcons.CHECK,
    cancel: PrimeIcons.TIMES,
  };

  rate: number = 0;
  message: string = '';

  constructor() {}

  ngOnInit(): void {}

  get isFormValid(): boolean {
    return this.rate > 0 && this.message.length > MIN_ABOUT_LENGTH;
  }

  save(): void {
    if (!this.isFormValid) {
      return;
    }

    this.saveRate.emit({ value: this.rate, message: this.message });
  }

  cancel(): void {
    this.cancelRate.emit();
  }
}
