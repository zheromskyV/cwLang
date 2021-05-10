import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PrimeIcons } from 'primeng/api';

import { RootState } from 'src/app/store/root.state';
import { dictionary } from 'src/app/constants/dictionary';
import { Course, CourseInfo, Courses } from 'src/app/models/course';
import { Users, UserInfo, User } from 'src/app/models/user';
import { Group, GroupInfo } from 'src/app/models/group';
import * as StudentsActions from '../../../store/students/students.actions';
import * as fromStudents from '../../../store/students/students.selectors';
import * as TeachersActions from '../../../store/teachers/teachers.actions';
import * as fromTeachers from '../../../store/teachers/teachers.selectors';
import * as CoursesActions from '../../../store/courses/courses.actions';
import * as fromCourses from '../../../store/courses/courses.selectors';
import { DAYS_OF_WEEK } from 'src/app/constants/days-of-week';

@Component({
  selector: 'cwl-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {
  @Input() group: GroupInfo;

  @Output() saveGroup = new EventEmitter<Group>();
  @Output() cancelGroup = new EventEmitter();

  dictionary = dictionary;
  daysOfWeek = DAYS_OF_WEEK.map((label, value) => ({ label, value }));
  icons = {
    save: PrimeIcons.CHECK,
    cancel: PrimeIcons.TIMES,
  };

  formGroup: FormGroup;
  formFields = {
    title: '',
    startTime: 'startTime',
    endTime: 'endTime',
    startRecur: 'startRecur',
    endRecur: 'endRecur',
  };

  courses: Courses = [];
  selectedCourse: CourseInfo = null;
  teachers: Users = [];
  selectedTeacher: UserInfo = null;
  students: Users = [];
  selectedStudents: Users = [];
  selectedDaysOfWeek: { label: string; value: number }[] = [];

  private readonly subscriptions = new Subscription();

  constructor(private readonly formBuilder: FormBuilder, private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.formFields.title]: [this.group?.schedule.title, [Validators.required]],
      [this.formFields.startTime]: [
        this.group ? new Date(+this.group!.schedule.startTime) : null,
        [Validators.required],
      ],
      [this.formFields.endTime]: [this.group ? new Date(+this.group!.schedule.endTime) : null, [Validators.required]],
      [this.formFields.startRecur]: [
        this.group ? new Date(+this.group!.schedule.startRecur) : null,
        [Validators.required],
      ],
      [this.formFields.endRecur]: [this.group ? new Date(+this.group!.schedule.endRecur) : null, [Validators.required]],
    });

    this.selectedCourse = this.group?.course;
    this.selectedTeacher = this.group?.teacher;
    this.selectedStudents = this.group?.students || [];
    this.selectedDaysOfWeek =
      this.group?.schedule.daysOfWeek.map((value) => ({ label: DAYS_OF_WEEK[value], value })) || [];

    this.loadData();

    this.subscriptions.add(
      this.store.select(fromCourses.getCourses).subscribe((courses) => {
        this.courses = courses;
      })
    );

    this.subscriptions.add(
      this.store.select(fromTeachers.getTeachers).subscribe((teachers) => {
        this.teachers = teachers;
      })
    );

    this.subscriptions.add(
      this.store.select(fromStudents.getStudents).subscribe((students) => {
        this.students = students;
      })
    );
  }

  get isFormValid(): boolean {
    return this.formGroup.valid && !!this.selectedCourse && !!this.selectedTeacher && !!this.selectedDaysOfWeek.length;
  }

  getFieldValue(field: string): any {
    return this.formGroup.controls[field].value;
  }

  loadData(): void {
    this.store.dispatch(CoursesActions.getCourses());
    this.store.dispatch(TeachersActions.getTeachers());
    this.store.dispatch(StudentsActions.getStudents());
  }

  clearData(): void {
    this.store.dispatch(CoursesActions.clearCourses());
    this.store.dispatch(TeachersActions.clearTeachers());
    this.store.dispatch(StudentsActions.clearStudents());
  }

  save(): void {
    if (!this.isFormValid) {
      return;
    }

    const group: Group = {
      ...this.group,
      course: this.selectedCourse as Course,
      teacher: this.selectedTeacher as User,
      students: this.selectedStudents,
      schedule: {
        title: this.getFieldValue(this.formFields.title),
        startTime: this.getFieldValue(this.formFields.startTime).getTime().toString(),
        endTime: this.getFieldValue(this.formFields.endTime).getTime().toString(),
        daysOfWeek: this.selectedDaysOfWeek.map(({ value }) => value),
        startRecur: this.getFieldValue(this.formFields.startRecur).getTime().toString(),
        endRecur: this.getFieldValue(this.formFields.endRecur).getTime().toString(),
      },
    };

    this.clearData();
    this.saveGroup.emit(group);
  }

  cancel(): void {
    this.clearData();
    this.cancelGroup.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.clearData();
  }
}
