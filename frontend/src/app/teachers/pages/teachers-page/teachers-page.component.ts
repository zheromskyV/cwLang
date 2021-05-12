import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { dictionary } from 'src/app/constants/dictionary';
import { Users } from 'src/app/models/user';
import { RootState } from 'src/app/store/root.state';
import * as TeachersActions from '../../../store/teachers/teachers.actions';
import * as fromTeachers from '../../../store/teachers/teachers.selectors';

@Component({
  selector: 'cwl-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss'],
})
export class TeachersPageComponent implements OnInit {
  dictionary = dictionary;

  teachers$: Observable<Users>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(TeachersActions.getTeachers());

    this.teachers$ = this.store.select(fromTeachers.getTeachers);
  }

  ngOnDestroy(): void {
    this.store.dispatch(TeachersActions.clearTeachers());
  }
}
