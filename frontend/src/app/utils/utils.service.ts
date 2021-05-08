import { Route } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { dictionary } from '../constants/dictionary';
import { User } from '../models/user';

export class UtilsService {
  static defaultRedirect(redirectTo: string): Route {
    return {
      path: routerPaths.home,
      pathMatch: 'full',
      redirectTo,
    };
  }

  static getDebtLabel(debt: number = 0): string {
    return debt > 0 ? `${dictionary.debt} (${debt}$)` : dictionary.paid;
  }

  static getDiscountLabel(discount: number = 0): string {
    return discount > 0 ? `${dictionary.discount}: ${discount}%` : '';
  }

  static getStatusLabel({ profile }: User): string {
    const debtLabel = UtilsService.getDebtLabel(profile?.debt);
    const discountLabel = UtilsService.getDiscountLabel(profile?.discount);
    const separator = discountLabel ? ' | ' : '';

    return `${debtLabel}${separator}${discountLabel}`;
  }
}
