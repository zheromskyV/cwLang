import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { dictionary } from 'src/app/constants/dictionary';
import { Roles } from 'src/app/constants/roles.enum';
import { RootState } from 'src/app/store/root.state';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit {
  dictionary = dictionary;

  role$: Observable<Roles>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.role$ = this.store.select(fromAuth.getUserRole);
  }
}
