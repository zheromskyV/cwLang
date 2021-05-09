import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/store/root.state';
import { dictionary } from 'src/app/constants/dictionary';
import { Course, CourseInfo, Courses } from 'src/app/models/course';
import * as CoursesActions from '../../../store/courses/courses.actions';
import * as fromCourses from '../../../store/courses/courses.selectors';

@Component({
  selector: 'cwl-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [ConfirmationService],
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  dictionary = dictionary;
  icons = {
    add: PrimeIcons.PLUS,
    confirm: PrimeIcons.EXCLAMATION_TRIANGLE,
  };

  courses$: Observable<Courses>;
  formDialog: boolean;
  isEditing: boolean;
  currentCourse: CourseInfo;

  constructor(private readonly store: Store<RootState>, private readonly confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.getCourses());

    this.courses$ = this.store.select(fromCourses.getCourses);
  }

  addCourse(): void {
    this.currentCourse = null;
    this.formDialog = true;
    this.isEditing = false;
  }

  editCourse(course: Course): void {
    this.currentCourse = { ...course };
    this.formDialog = true;
    this.isEditing = true;
  }

  saveCourse(course: Course): void {
    this.isEditing
      ? this.store.dispatch(CoursesActions.updateCourse({ course }))
      : this.store.dispatch(CoursesActions.addCourse({ course }));

    this.cancel();
  }

  cancel(): void {
    this.currentCourse = null;
    this.isEditing = false;
    this.formDialog = false;
  }

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
