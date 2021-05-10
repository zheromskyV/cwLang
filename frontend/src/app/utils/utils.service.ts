import _ from 'lodash';
import { Route } from '@angular/router';

import { routerPaths } from '../constants/router-paths';
import { dictionary } from '../constants/dictionary';
import { User } from '../models/user';

interface anyObj {
  [key: string]: any;
}

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

  static getAge(user: User): number {
    const ageDate = new Date(Date.now() - user.birthday);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  static deepOmit(obj: anyObj, keysToOmit: string[]): anyObj {
    const keysToOmitIndex = _.keyBy(keysToOmit);

    function omitFromObject(obj: anyObj): anyObj {
      return _.transform(obj, (result: anyObj, value: any, key: string) => {
        if (key in keysToOmitIndex) {
          return;
        }

        result[key] = _.isObject(value) ? omitFromObject(value) : value;
      });
    }

    return omitFromObject(obj);
  }

  static cleanObject(obj: anyObj): anyObj {
    return _.omit(UtilsService.deepOmit(obj, ['__typename']), '_id');
  }
}
