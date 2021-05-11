import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { MIN_ABOUT_LENGTH } from 'src/app/constants/auth';
import { dictionary } from 'src/app/constants/dictionary';
import { RootState } from 'src/app/store/root.state';
import { UserInfo, Users, User } from 'src/app/models/user';
import { GroupInfo, Groups } from 'src/app/models/group';
import * as GroupsActions from '../../../store/groups/groups.actions';
import * as MarksActions from '../../../store/marks/marks.actions';
import * as fromGroups from '../../../store/groups/groups.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-add-mark-form',
  templateUrl: './add-mark-form.component.html',
  styleUrls: ['./add-mark-form.component.scss'],
})
export class AddMarkFormComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    save: PrimeIcons.CHECK,
    increment: PrimeIcons.PLUS,
    decrement: PrimeIcons.MINUS,
  };

  rate: number = 0;
  message: string = '';
  groups$: Observable<Groups>;
  selectedGroup: GroupInfo;
  selectedStudent: UserInfo;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.getUserInfo), take(1)).subscribe((userInfo) => {
      this.store.dispatch(GroupsActions.getUserGroups({ user: userInfo as User }));
    });

    this.groups$ = this.store.select(fromGroups.getGroups);
  }

  get students(): Users {
    return this.selectedGroup?.students || [];
  }

  get isFormValid(): boolean {
    return this.rate > 0 && this.message.length > MIN_ABOUT_LENGTH && !!this.selectedStudent;
  }

  submit(): void {
    if (this.isFormValid) {
      this.store.dispatch(
        MarksActions.addMark({
          user: this.selectedStudent as User,
          mark: {
            value: this.rate,
            message: this.message,
          },
        })
      );

      this.rate = 0;
      this.message = '';
      this.selectedGroup = null;
      this.selectedStudent = null;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(GroupsActions.clearGroups());
  }
}
