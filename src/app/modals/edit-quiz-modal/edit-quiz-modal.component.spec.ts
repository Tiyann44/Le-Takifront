import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizModalComponent } from './edit-quiz-modal.component';

describe('EditQuizModalComponent', () => {
  let component: EditQuizModalComponent;
  let fixture: ComponentFixture<EditQuizModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuizModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuizModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
