import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RoutesRecognized, Event as RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RootState } from 'src/app/store/root.state';
import { dictionary } from '../../../constants/dictionary';
import { navigation } from '../../../constants/navigation';
import { Roles } from '../../../constants/roles.enum';
import { NavigationModel } from '../../../models/navigation';
import { NavigationService } from '../../services/navigation.service';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as fromAuth from '../../../store/auth/auth.selectors';

@Component({
  selector: 'cwl-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  dictionary = dictionary;
  icons = {
    logo: PrimeIcons.SITEMAP,
    signOut: PrimeIcons.SIGN_OUT,
  };

  navigation: NavigationModel;
  role: Roles;
  currentUrl = '';

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly store: Store<RootState>,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(fromAuth.getUserRole).subscribe((role) => {
        this.role = role;
        this.navigation = navigation[this.role];
      })
    );

    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((event: RouterEvent) => event instanceof RoutesRecognized),
          map((event) => (event as RoutesRecognized).url)
        )
        .subscribe((currentUrl: string) => {
          this.currentUrl = currentUrl;
        })
    );
  }

  getStyleClass(linkUrl: string): string {
    return `nav-link p-button-text p-button-${this.currentUrl.includes(linkUrl) ? 'primary' : 'secondary'}`;
  }

  navigateTo(url: string): void {
    this.navigationService.navigateTo(url);
  }

  logOut(): void {
    this.store.dispatch(AuthActions.logOut());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
