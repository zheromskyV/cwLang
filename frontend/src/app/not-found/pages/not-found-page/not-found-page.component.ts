import { Component, OnInit } from '@angular/core';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { dictionary } from '../../../constants/dictionary';

@Component({
  selector: 'cwl-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
  dictionary = dictionary;

  constructor(private readonly navigationService: NavigationService) {}

  ngOnInit(): void {}

  goToHomePage(): void {
    this.navigationService.navigateToHomePage();
  }
}
