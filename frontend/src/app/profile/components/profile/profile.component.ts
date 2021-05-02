import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';

import { dictionary } from 'src/app/constants/dictionary';
import { UserInfo } from 'src/app/models/user';
import { RootState } from 'src/app/store/root.state';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    edit: PrimeIcons.PENCIL,
  };

  userInfo$: Observable<UserInfo>;
  isEditable = false;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromAuth.getUserInfo);
  }

  onEdit(): void {
    this.isEditable = true;
  }

  onStopEditing(): void {
    this.isEditable = false;
  }
}
