import { Component, Input } from '@angular/core';
import { dictionary } from 'src/app/constants/dictionary';

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

  get debtLabel(): string {
    return this.isDebt ? `${dictionary.debt} (${this.debt}$)` : dictionary.paid;
  }

  get statusLabel(): string {
    return `${dictionary.status}: ${this.debtLabel}`;
  }

  get discountLabel(): string {
    return this.isDiscount ? `${dictionary.discount}: ${this.discount}%` : '';
  }
}
