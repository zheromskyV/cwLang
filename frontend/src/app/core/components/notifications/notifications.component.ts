import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { dictionary } from 'src/app/constants/dictionary';
import { RootState } from 'src/app/store/root.state';
import * as UiActions from '../../../store/ui/ui.actions';
import * as fromUi from '../../../store/ui/ui.selectors';

@Component({
  selector: 'cwl-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [MessageService],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  dictionary = dictionary;

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<RootState>, private readonly messageService: MessageService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(fromUi.getGeneralSuccess)
        .pipe(filter((isSuccess) => isSuccess))
        .subscribe(() => {
          this.showSuccessMessage(this.dictionary.generalSuccess);
          this.store.dispatch(UiActions.setGeneralSuccess({ isGeneralSuccess: false }));
        })
    );

    this.subscriptions.add(
      this.store
        .select(fromUi.getLoginError)
        .pipe(filter((isError) => isError))
        .subscribe(() => {
          this.showErrorMessage(this.dictionary.loginError);
          this.store.dispatch(UiActions.setLoginError({ isLoginError: false }));
        })
    );

    this.subscriptions.add(
      this.store
        .select(fromUi.getRegistrationError)
        .pipe(filter((isError) => isError))
        .subscribe(() => {
          this.showErrorMessage(this.dictionary.registrationError);
          this.store.dispatch(UiActions.setRegistrationError({ isRegistrationError: false }));
        })
    );

    this.subscriptions.add(
      this.store
        .select(fromUi.getUpdateUserError)
        .pipe(filter((isError) => isError))
        .subscribe(() => {
          this.showErrorMessage(this.dictionary.updateError);
          this.store.dispatch(UiActions.setUpdateUserError({ isUpdateUserError: false }));
        })
    );

    this.subscriptions.add(
      this.store
        .select(fromUi.getUpdateUserSuccess)
        .pipe(filter((isSuccess) => isSuccess))
        .subscribe(() => {
          this.showSuccessMessage(this.dictionary.updateSuccess);
          this.store.dispatch(UiActions.setUpdateUserSuccess({ isUpdateUserSuccess: false }));
        })
    );
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: this.dictionary.error,
      detail: message,
    });
  }

  private showSuccessMessage(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: this.dictionary.success,
      detail: message,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
