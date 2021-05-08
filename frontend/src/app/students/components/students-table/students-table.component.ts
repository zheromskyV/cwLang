import { Component, Input, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { dictionary } from 'src/app/constants/dictionary';
import { User, Users } from 'src/app/models/user';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'cwl-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent implements OnInit {
  @Input() students: Users = [];

  dictionary = dictionary;
  icons = {
    expand: PrimeIcons.CHEVRON_RIGHT,
    collapse: PrimeIcons.CHEVRON_DOWN,
    clearFilters: PrimeIcons.FILTER_SLASH,
    search: PrimeIcons.SEARCH,
  };

  constructor() {}

  ngOnInit(): void {}

  getAge(student: User): number {
    const ageDate = new Date(Date.now() - student.birthday);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getStatus(student: User): string {
    return UtilsService.getStatusLabel(student);
  }
}
