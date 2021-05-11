import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksPageComponent } from './marks-page.component';

describe('MarksPageComponent', () => {
  let component: MarksPageComponent;
  let fixture: ComponentFixture<MarksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarksPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
