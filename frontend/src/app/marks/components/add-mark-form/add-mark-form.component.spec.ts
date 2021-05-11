import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarkFormComponent } from './add-mark-form.component';

describe('AddMarkFormComponent', () => {
  let component: AddMarkFormComponent;
  let fixture: ComponentFixture<AddMarkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMarkFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
