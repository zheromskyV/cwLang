import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';

import { MIN_ABOUT_LENGTH } from 'src/app/constants/auth';
import { RootState } from 'src/app/store/root.state';
import { dictionary } from 'src/app/constants/dictionary';
import * as MessagesActions from '../../../store/messages/messages.actions';

@Component({
  selector: 'cwl-send-question',
  templateUrl: './send-question.component.html',
  styleUrls: ['./send-question.component.scss'],
})
export class SendQuestionComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    send: PrimeIcons.SEND,
  };

  message: string = '';

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {}

  get isFormValid(): boolean {
    return this.message.length > MIN_ABOUT_LENGTH;
  }

  submit(): void {
    if (this.isFormValid) {
      this.store.dispatch(MessagesActions.sendQuestion({ message: this.message }));

      this.message = '';
    }
  }
}
