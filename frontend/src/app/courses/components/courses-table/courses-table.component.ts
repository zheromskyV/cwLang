import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConfirmationService, PrimeIcons } from 'primeng/api';

import { RootState } from 'src/app/store/root.state';
import { Course, Courses } from 'src/app/models/course';
import { dictionary } from 'src/app/constants/dictionary';
import * as CoursesActions from '../../../store/courses/courses.actions';
import * as fromCourses from '../../../store/courses/courses.selectors';

@Component({
  selector: 'cwl-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
  providers: [ConfirmationService],
})
export class CoursesTableComponent implements OnInit, OnDestroy {
  dictionary = dictionary;
  icons = {
    expand: PrimeIcons.CHEVRON_RIGHT,
    collapse: PrimeIcons.CHEVRON_DOWN,
    add: PrimeIcons.PLUS,
    edit: PrimeIcons.PENCIL,
    delete: PrimeIcons.TRASH,
    confirm: PrimeIcons.EXCLAMATION_TRIANGLE,
  };

  courses: Courses = [];

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<RootState>, private readonly confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.getCourses());

    this.subscriptions.add(
      this.store.select(fromCourses.getCourses).subscribe((courses) => {
        this.courses = courses;
      })
    );
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
    this.subscriptions.unsubscribe();
    this.store.dispatch(CoursesActions.clearCourses());
  }
}
