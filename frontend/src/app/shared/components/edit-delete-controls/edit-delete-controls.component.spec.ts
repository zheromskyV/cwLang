import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteControlsComponent } from './edit-delete-controls.component';

describe('EditDeleteControlsComponent', () => {
  let component: EditDeleteControlsComponent;
  let fixture: ComponentFixture<EditDeleteControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDeleteControlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
