import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { dictionary } from 'src/app/constants/dictionary';
import { Roles } from 'src/app/constants/roles.enum';
import { RootState } from 'src/app/store/root.state';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-marks-page',
  templateUrl: './marks-page.component.html',
  styleUrls: ['./marks-page.component.scss'],
})
export class MarksPageComponent implements OnInit {
  dictionary = dictionary;

  role$: Observable<Roles>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.role$ = this.store.select(fromAuth.getUserRole);
  }
}
