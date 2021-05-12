import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';

import { PageContainerComponent } from './components/page-container/page-container.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [PageContainerComponent, NavigationBarComponent, NotificationsComponent],
  imports: [CommonModule, ButtonModule, DividerModule, ToastModule],
  exports: [PageContainerComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded');
    }
  }
}
