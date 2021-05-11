import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendQuestionComponent } from './send-question.component';

describe('SendQuestionComponent', () => {
  let component: SendQuestionComponent;
  let fixture: ComponentFixture<SendQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendQuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
