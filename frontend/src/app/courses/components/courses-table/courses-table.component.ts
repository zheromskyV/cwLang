import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { Course, Courses } from 'src/app/models/course';
import { dictionary } from 'src/app/constants/dictionary';
import { Roles } from 'src/app/constants/roles.enum';

@Component({
  selector: 'cwl-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent implements OnInit {
  @Input() courses: Courses = [];
  @Input() role: Roles = Roles.Undefined;

  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();
  @Output() addWordToCourse = new EventEmitter<Course>();

  dictionary = dictionary;
  icons = {
    expand: PrimeIcons.CHEVRON_RIGHT,
    collapse: PrimeIcons.CHEVRON_DOWN,
    add: PrimeIcons.PLUS,
  };

  constructor() {}

  ngOnInit(): void {}

  get isAdminView(): boolean {
    return this.role === Roles.Admin;
  }

  get isTeacherView(): boolean {
    return this.role === Roles.Teacher;
  }

  get areControlsVisible(): boolean {
    return this.isTeacherView || this.isAdminView;
  }

  edit(course: Course): void {
    this.editCourse.emit(course);
  }

  delete(course: Course): void {
    this.deleteCourse.emit(course);
  }

  addWord(course: Course): void {
    this.addWordToCourse.emit(course);
  }
}
