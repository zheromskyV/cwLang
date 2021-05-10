import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { Course } from 'src/app/models/course';

@Component({
  selector: 'cwl-edit-delete-controls',
  templateUrl: './edit-delete-controls.component.html',
  styleUrls: ['./edit-delete-controls.component.scss'],
})
export class EditDeleteControlsComponent<T> implements OnInit {
  @Input() data: T;

  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();

  icons = {
    edit: PrimeIcons.PENCIL,
    delete: PrimeIcons.TRASH,
  };

  constructor() {}

  ngOnInit(): void {}

  edit(): void {
    this.onEdit.emit(this.data);
  }

  delete(): void {
    this.onDelete.emit(this.data);
  }
}
