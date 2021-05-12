import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

import { RootState } from 'src/app/store/root.state';
import { dictionary } from 'src/app/constants/dictionary';
import { Group, GroupInfo, Groups } from 'src/app/models/group';
import { Roles } from 'src/app/constants/roles.enum';
import { User, UserInfo } from 'src/app/models/user';
import { Rating } from 'src/app/models/rating';
import * as GroupsActions from '../../../store/groups/groups.actions';
import * as MarksActions from '../../../store/marks/marks.actions';
import * as fromGroups from '../../../store/groups/groups.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
  providers: [ConfirmationService],
})
export class GroupsPageComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    add: PrimeIcons.PLUS,
    confirm: PrimeIcons.EXCLAMATION_TRIANGLE,
  };

  role: Roles = Roles.Undefined;
  groups$: Observable<Groups>;
  formDialog: boolean;
  isEditing: boolean;
  currentGroup: GroupInfo;
  formTeacherDialog: boolean;
  teacherToRate: UserInfo;

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<RootState>, private readonly confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(fromAuth.getUserInfo).subscribe((userInfo) => {
        const user = userInfo as User;

        this.role = user.role;

        this.loadData(user);
      })
    );

    this.groups$ = this.store.select(fromGroups.getGroups);
  }

  loadData(user: UserInfo = null): void {
    this.store.dispatch(
      this.isAdminView ? GroupsActions.getGroups() : GroupsActions.getUserGroups({ user: user as User })
    );
  }

  get isAdminView(): boolean {
    return this.role === Roles.Admin;
  }

  get isStudentView(): boolean {
    return this.role === Roles.Student;
  }

  addGroup(): void {
    this.currentGroup = null;
    this.formDialog = true;
    this.isEditing = false;
  }

  editGroup(group: Group): void {
    this.currentGroup = { ...group };
    this.formDialog = true;
    this.isEditing = true;
  }

  saveGroup(group: Group): void {
    this.isEditing
      ? this.store.dispatch(GroupsActions.updateGroup({ group }))
      : this.store.dispatch(GroupsActions.addGroup({ group }));
    this.loadData();

    this.cancel();
  }

  cancel(): void {
    this.currentGroup = null;
    this.teacherToRate = null;
    this.isEditing = false;
    this.formDialog = false;
    this.formTeacherDialog = false;
  }

  deleteGroup(group: Group): void {
    this.confirmationService.confirm({
      header: this.dictionary.confirm,
      icon: this.icons.confirm,
      message: this.dictionary.confirmMessage,
      acceptLabel: this.dictionary.acceptLabel,
      rejectLabel: this.dictionary.rejectLabel,
      accept: () => {
        this.store.dispatch(GroupsActions.deleteGroup({ group }));
      },
    });
  }

  rateTeacher(user: User): void {
    this.teacherToRate = { ...user };
    this.formTeacherDialog = true;
  }

  saveRate(rating: Rating): void {
    this.store.dispatch(MarksActions.addMark({ user: this.teacherToRate as User, mark: rating }));

    this.cancel();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(GroupsActions.clearGroups());
  }
}
