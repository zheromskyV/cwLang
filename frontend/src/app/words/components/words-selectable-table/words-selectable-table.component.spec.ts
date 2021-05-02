import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsSelectableTableComponent } from './words-selectable-table.component';

describe('WordsSelectableTableComponent', () => {
  let component: WordsSelectableTableComponent;
  let fixture: ComponentFixture<WordsSelectableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordsSelectableTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsSelectableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
