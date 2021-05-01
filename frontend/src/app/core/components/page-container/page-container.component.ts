import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/store/root.state';
import * as fromUi from 'src/app/store/ui/ui.selectors';

@Component({
  selector: 'cwl-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent implements OnInit {
  isNavigationShown$: Observable<boolean>;

  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.isNavigationShown$ = this.store.pipe(select(fromUi.getNavigationShown));
  }
}
