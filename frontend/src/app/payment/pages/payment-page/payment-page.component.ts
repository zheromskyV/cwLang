import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { dictionary } from 'src/app/constants/dictionary';
import { RootState } from 'src/app/store/root.state';
import { UserInfo, Users, User } from 'src/app/models/user';
import { GroupInfo, Groups } from 'src/app/models/group';
import * as GroupsActions from '../../../store/groups/groups.actions';
import * as PaymentActions from '../../../store/payment/payment.actions';
import * as fromGroups from '../../../store/groups/groups.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cwl-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    save: PrimeIcons.CHECK,
    increment: PrimeIcons.PLUS,
    decrement: PrimeIcons.MINUS,
  };

  groups$: Observable<Groups>;
  selectedGroup: GroupInfo;
  selectedStudent: UserInfo;
  payment = 0;
  paymentChange = 0;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(GroupsActions.getGroups());

    this.groups$ = this.store.select(fromGroups.getGroups);
  }

  get students(): Users {
    return this.selectedGroup?.students || [];
  }

  get isFormValid(): boolean {
    return !!this.selectedStudent;
  }

  get totalToPay(): number {
    const debt = this.selectedStudent?.profile?.debt || 0;
    const discount = this.selectedStudent?.profile?.discount || 0;

    return +(debt - debt * (discount / 100)).toFixed(2);
  }

  calculatePaymentChange(): void {
    this.paymentChange = +(this.payment - this.totalToPay).toFixed(2);
  }

  submit(): void {
    if (this.isFormValid) {
      this.store.dispatch(
        PaymentActions.makePayment({
          user: this.selectedStudent as User,
          paymentAmount: this.payment,
        })
      );

      this.selectedGroup = null;
      this.selectedStudent = null;
      this.paymentChange = 0;
      this.payment = 0;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(GroupsActions.clearGroups());
  }
}
