import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';

import { Course, Courses } from 'src/app/models/course';
import { dictionary } from 'src/app/constants/dictionary';

@Component({
  selector: 'cwl-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
  providers: [ConfirmationService],
})
export class CoursesTableComponent implements OnInit {
  @Input() courses: Courses = [];

  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  dictionary = dictionary;
  icons = {
    expand: PrimeIcons.CHEVRON_RIGHT,
    collapse: PrimeIcons.CHEVRON_DOWN,
    add: PrimeIcons.PLUS,
    edit: PrimeIcons.PENCIL,
    delete: PrimeIcons.TRASH,
    confirm: PrimeIcons.EXCLAMATION_TRIANGLE,
  };

  constructor() {}

  ngOnInit(): void {}

  edit(course: Course): void {
    this.editCourse.emit(course);
  }

  delete(course: Course): void {
    this.deleteCourse.emit(course);
  }
}
