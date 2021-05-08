import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { Course } from 'src/app/models/course';

@Component({
  selector: 'cwl-edit-delete-controls',
  templateUrl: './edit-delete-controls.component.html',
  styleUrls: ['./edit-delete-controls.component.scss'],
})
export class EditDeleteControlsComponent implements OnInit {
  @Input() course: Course;

  @Output() onEdit = new EventEmitter<Course>();
  @Output() onDelete = new EventEmitter<Course>();

  icons = {
    edit: PrimeIcons.PENCIL,
    delete: PrimeIcons.TRASH,
  };

  constructor() {}

  ngOnInit(): void {}

  edit(): void {
    this.onEdit.emit(this.course);
  }

  delete(): void {
    this.onDelete.emit(this.course);
  }
}
