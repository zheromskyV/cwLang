import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { Group, Groups, TableGroup, TableGroups } from 'src/app/models/group';
import { dictionary } from 'src/app/constants/dictionary';
import { Roles } from 'src/app/constants/roles.enum';
import { DAYS_OF_WEEK } from 'src/app/constants/days-of-week';
import { User } from 'src/app/models/user';

@Component({
  selector: 'cwl-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss'],
})
export class GroupsTableComponent implements OnInit, OnChanges {
  @Input() groups: Groups = [];
  @Input() role: Roles = Roles.Undefined;

  @Output() editGroup = new EventEmitter<Group>();
  @Output() deleteGroup = new EventEmitter<Group>();
  @Output() rateTeacher = new EventEmitter<User>();

  dictionary = dictionary;
  icons = {
    expand: PrimeIcons.CHEVRON_RIGHT,
    collapse: PrimeIcons.CHEVRON_DOWN,
    rate: PrimeIcons.STAR,
  };

  mappedTableData: TableGroups = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.mappedTableData = this.groups.map((group) => ({
      _id: group._id,
      title: `${group.course.title} - ${dictionary[group.course.targetLang]} ${group.course.level}`,
      schedule: `${this.parseTime(+group.schedule.startTime)} - ${this.parseTime(
        +group.schedule.endTime
      )} (${group.schedule.daysOfWeek.map((day) => DAYS_OF_WEEK[day]).join(', ')})`,
      teacher: `${group.teacher.name} ${group.teacher.surname} (${group.teacher.email})`,
      students: group.students,
    }));
  }

  get isAdminView(): boolean {
    return this.role === Roles.Admin;
  }

  get isStudentView(): boolean {
    return this.role === Roles.Student;
  }

  get areControlsVisible(): boolean {
    return this.isStudentView || this.isAdminView;
  }

  edit(tableGroup: TableGroup): void {
    this.editGroup.emit(this.getTrueGroup(tableGroup));
  }

  delete(tableGroup: TableGroup): void {
    this.deleteGroup.emit(this.getTrueGroup(tableGroup));
  }

  rate(tableGroup: TableGroup): void {
    this.rateTeacher.emit(this.getTrueGroup(tableGroup).teacher);
  }

  private getTrueGroup(tableGroup: TableGroup): Group {
    return this.groups.find(({ _id }) => _id === tableGroup._id)!;
  }

  private parseTime(date: number): string {
    const [hours, minutes] = new Date(date).toTimeString().split(':');

    return `${hours}:${minutes}`;
  }
}
