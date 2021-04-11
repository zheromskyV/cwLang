import { Route } from '@angular/router';

import { routerPaths } from '../constants/router-paths';

export class UtilsService {
  static defaultRedirect(redirectTo: string): Route {
    return {
      path: routerPaths.home,
      pathMatch: 'full',
      redirectTo,
    };
  }
}
