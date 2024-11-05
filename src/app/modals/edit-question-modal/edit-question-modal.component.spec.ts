import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionModalComponent } from './edit-question-modal.component';

describe('EditQuestionModalComponent', () => {
  let component: EditQuestionModalComponent;
  let fixture: ComponentFixture<EditQuestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
