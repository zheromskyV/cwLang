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
import * as MessagesActions from '../../../store/messages/messages.actions';

@Component({
  selector: 'cwl-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss'],
})
export class SendNotificationComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    send: PrimeIcons.SEND,
  };

  groups$: Observable<Groups>;
  selectedGroup: GroupInfo;
  selectedStudent: UserInfo;

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

  submit(): void {
    if (this.isFormValid) {
      this.store.dispatch(
        MessagesActions.sendDebtNotification({
          user: this.selectedStudent as User,
        })
      );

      this.selectedGroup = null;
      this.selectedStudent = null;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(GroupsActions.clearGroups());
  }
}
