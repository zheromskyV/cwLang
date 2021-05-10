import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTeacherComponent } from './rate-teacher.component';

describe('RateTeacherComponent', () => {
  let component: RateTeacherComponent;
  let fixture: ComponentFixture<RateTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateTeacherComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
