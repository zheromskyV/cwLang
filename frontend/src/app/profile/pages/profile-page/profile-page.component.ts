import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { dictionary } from 'src/app/constants/dictionary';
import { Roles } from 'src/app/constants/roles.enum';
import { RootState } from 'src/app/store/root.state';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  dictionary = dictionary;

  role: Roles;
  debt: number;
  discount: number;

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(fromAuth.getUserRole).subscribe((role) => {
        this.role = role;
      })
    );

    this.subscriptions.add(
      this.store
        .pipe(
          filter(() => this.isStatusSectionAvailable),
          select(fromAuth.getUserProfile)
        )
        .subscribe((profile) => {
          this.debt = profile?.debt ?? 0;
          this.discount = profile?.discount ?? 0;
        })
    );
  }

  get isStatusSectionAvailable(): boolean {
    return this.role === Roles.Student;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
