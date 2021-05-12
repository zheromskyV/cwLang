import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { RootState } from 'src/app/store/root.state';
import { NavigationService } from './navigation.service';
import * as fromAuth from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private readonly store: Store<RootState>, private readonly navigationService: NavigationService) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(AuthActions.checkSession());

    return this.store.select(fromAuth.getUserLoggedIn).pipe(
      map((isUserLoggedIn) => {
        if (!isUserLoggedIn) {
          this.navigationService.navigateToLoginPage();
        }

        return isUserLoggedIn;
      }),
      first()
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
