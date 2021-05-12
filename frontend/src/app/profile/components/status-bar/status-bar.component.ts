import { Component, Input } from '@angular/core';

import { dictionary } from 'src/app/constants/dictionary';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'cwl-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent {
  @Input() debt: number;
  @Input() discount: number;

  dictionary = dictionary;

  get isDebt(): boolean {
    return this.debt > 0;
  }

  get isDiscount(): boolean {
    return this.discount > 0;
  }

  get statusLabel(): string {
    return `${dictionary.status}: ${UtilsService.getDebtLabel(this.debt)}`;
  }

  get discountLabel(): string {
    return UtilsService.getDiscountLabel(this.discount);
  }
}
