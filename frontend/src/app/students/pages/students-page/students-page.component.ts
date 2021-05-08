import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { dictionary } from 'src/app/constants/dictionary';
import { Users } from 'src/app/models/user';
import { RootState } from 'src/app/store/root.state';
import * as StudentsActions from '../../../store/students/students.actions';
import * as fromStudents from '../../../store/students/students.selectors';

@Component({
  selector: 'cwl-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  dictionary = dictionary;

  students$: Observable<Users>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(StudentsActions.getStudents());

    this.students$ = this.store.select(fromStudents.getStudents);
  }

  ngOnDestroy(): void {
    this.store.dispatch(StudentsActions.clearStudents());
  }
}
