import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { SendQuestionComponent } from './components/send-question/send-question.component';
import { SendNotificationComponent } from './components/send-notification/send-notification.component';

@NgModule({
  declarations: [MessagesPageComponent, SendQuestionComponent, SendNotificationComponent],
  imports: [SharedModule, MessagesRoutingModule],
})
export class MessagesModule {}
