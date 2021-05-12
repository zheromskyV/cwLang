import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, NotFoundRoutingModule, ButtonModule],
})
export class NotFoundModule {}
