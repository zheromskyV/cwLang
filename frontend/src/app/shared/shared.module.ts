import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';
import { CalendarModule } from 'primeng/calendar';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PickListModule } from 'primeng/picklist';
import { TabViewModule } from 'primeng/tabview';
import { RatingModule } from 'primeng/rating';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';

import { EditDeleteControlsComponent } from './components/edit-delete-controls/edit-delete-controls.component';
import { ModulePageComponent } from './components/module-page/module-page.component';
import { TableCaptionComponent } from './components/table-caption/table-caption.component';

@NgModule({
  declarations: [EditDeleteControlsComponent, ModulePageComponent, TableCaptionComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    KnobModule,
    CalendarModule,
    MessageModule,
    ToastModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    PickListModule,
    TabViewModule,
    RatingModule,
    MultiSelectModule,
    CardModule,
    CheckboxModule,
  ],
  exports: [
    EditDeleteControlsComponent,
    ModulePageComponent,
    TableCaptionComponent,
    CommonModule,
    ButtonModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    KnobModule,
    CalendarModule,
    MessageModule,
    ToastModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    PickListModule,
    TabViewModule,
    RatingModule,
    MultiSelectModule,
    CardModule,
    CheckboxModule,
  ],
})
export class SharedModule {}
