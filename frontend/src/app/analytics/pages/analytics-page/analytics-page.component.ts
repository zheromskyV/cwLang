import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { dictionary } from 'src/app/constants/dictionary';
import { Roles } from 'src/app/constants/roles.enum';
import { RootState } from 'src/app/store/root.state';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements OnInit {
  dictionary = dictionary;

  role$: Observable<Roles>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.role$ = this.store.select(fromAuth.getUserRole);
  }
}
