import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { dictionary } from 'src/app/constants/dictionary';
import { RootState } from 'src/app/store/root.state';
import { UserInfo, Users, User } from 'src/app/models/user';
import { GroupInfo, Groups } from 'src/app/models/group';
import * as GroupsActions from '../../../store/groups/groups.actions';
import * as fromGroups from '../../../store/groups/groups.selectors';
import * as PaymentActions from '../../../store/payment/payment.actions';

@Component({
  selector: 'cwl-discounts-page',
  templateUrl: './discounts-page.component.html',
  styleUrls: ['./discounts-page.component.scss'],
})
export class DiscountsPageComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    save: PrimeIcons.CHECK,
  };

  groups$: Observable<Groups>;
  selectedGroup: GroupInfo;
  selectedStudent: UserInfo;
  discount1: boolean = false;
  discount2: boolean = false;
  discount3: boolean = false;
  finalDiscount = 0;

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

  calculateDiscount(): void {
    this.finalDiscount = 0;

    if (this.discount1) {
      this.finalDiscount += 2;
    }

    if (this.discount2) {
      this.finalDiscount += 3;
    }

    if (this.discount3) {
      this.finalDiscount += 5;
    }
  }

  submit(): void {
    if (this.isFormValid) {
      this.store.dispatch(
        PaymentActions.addDiscount({
          user: this.selectedStudent as User,
          discount: this.finalDiscount,
        })
      );

      this.selectedGroup = null;
      this.selectedStudent = null;
      this.discount1 = false;
      this.discount2 = false;
      this.discount3 = false;
      this.finalDiscount = 0;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(GroupsActions.clearGroups());
  }
}
