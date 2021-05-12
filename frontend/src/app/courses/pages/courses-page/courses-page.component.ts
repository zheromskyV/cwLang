import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

import { RootState } from 'src/app/store/root.state';
import { dictionary } from 'src/app/constants/dictionary';
import { Course, CourseInfo, Courses } from 'src/app/models/course';
import { Roles } from 'src/app/constants/roles.enum';
import { Word } from 'src/app/models/word';
import * as CoursesActions from '../../../store/courses/courses.actions';
import * as WordsActions from '../../../store/words/words.actions';
import * as fromCourses from '../../../store/courses/courses.selectors';
import * as fromAuth from '../../../store/auth/auth.selectors';

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

  role: Roles = Roles.Undefined;
  courses$: Observable<Courses>;
  formDialog: boolean;
  isEditing: boolean;
  currentCourse: CourseInfo;
  formWordDialog: boolean;

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<RootState>, private readonly confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(fromAuth.getUserRole).subscribe((role) => {
        this.role = role;
        this.store.dispatch(CoursesActions.getCourses());
      })
    );

    this.courses$ = this.store.select(fromCourses.getCourses);
  }

  get isAdminView(): boolean {
    return this.role === Roles.Admin;
  }

  get isTeacherView(): boolean {
    return this.role === Roles.Teacher;
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
    this.formWordDialog = false;
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

  addWordToCourse(course: Course): void {
    this.currentCourse = course;
    this.formWordDialog = true;
  }

  saveWord(word: Word): void {
    this.store.dispatch(WordsActions.addWord({ word, course: this.currentCourse as Course }));

    this.cancel();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(CoursesActions.clearCourses());
  }
}
