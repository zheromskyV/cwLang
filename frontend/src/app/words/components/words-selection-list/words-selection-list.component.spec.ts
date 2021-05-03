import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsSelectionListComponent } from './words-selection-list.component';

describe('WordsSelectionListComponent', () => {
  let component: WordsSelectionListComponent;
  let fixture: ComponentFixture<WordsSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordsSelectionListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
