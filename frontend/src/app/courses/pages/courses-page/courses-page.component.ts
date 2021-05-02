import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/store/root.state';
import { dictionary } from 'src/app/constants/dictionary';
import { Course, Courses } from 'src/app/models/course';
import * as CoursesActions from '../../../store/courses/courses.actions';
import * as fromCourses from '../../../store/courses/courses.selectors';

@Component({
  selector: 'cwl-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [ConfirmationService],
})
export class CoursesPageComponent implements OnInit {
  dictionary = dictionary;
  icons = {
    add: PrimeIcons.PLUS,
    confirm: PrimeIcons.EXCLAMATION_TRIANGLE,
  };

  courses$: Observable<Courses>;

  constructor(private readonly store: Store<RootState>, private readonly confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.getCourses());

    this.courses$ = this.store.select(fromCourses.getCourses);
  }

  addCourse(): void {}

  editCourse(course: Course): void {}

  deleteCourse(course: Course): void {
    this.confirmationService.confirm({
      header: this.dictionary.confirm,
      icon: this.icons.confirm,
      message: this.dictionary.confirmMessage,
      acceptLabel: this.dictionary.acceptLabel,
      rejectLabel: this.dictionary.rejectLabel,
      accept: () => {
        this.store.dispatch(CoursesActions.deleteCourse({ course }));
      },
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(CoursesActions.clearCourses());
  }
}
