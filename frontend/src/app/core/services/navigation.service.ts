import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { routerPaths } from '../../constants/router-paths';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigateToHomePage(): void {
    this.navigateTo(routerPaths.home);
  }

  navigateToLoginPage(): void {
    this.navigateTo(this.getAuthPage(routerPaths.login));
  }

  navigateToSignUpPage(): void {
    this.navigateTo(this.getAuthPage(routerPaths.registration));
  }

  private getAuthPage(subPage: string): string {
    return `${routerPaths.auth}/${subPage}`;
  }
}
