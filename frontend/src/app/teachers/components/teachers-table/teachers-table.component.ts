import { Component, Input, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { dictionary } from 'src/app/constants/dictionary';
import { User, Users } from 'src/app/models/user';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'cwl-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss'],
})
export class TeachersTableComponent implements OnInit {
  @Input() teachers: Users = [];

  dictionary = dictionary;
  icons = {
    expand: PrimeIcons.CHEVRON_RIGHT,
    collapse: PrimeIcons.CHEVRON_DOWN,
  };

  constructor() {}

  ngOnInit(): void {}

  getAge(teacher: User): number {
    return UtilsService.getAge(teacher);
  }
}
