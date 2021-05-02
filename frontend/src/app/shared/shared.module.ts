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

@NgModule({
  declarations: [],
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
  ],
  exports: [
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
  ],
})
export class SharedModule {}
