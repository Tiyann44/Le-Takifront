import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThemeModalComponent } from './edit-theme-modal.component';

describe('EditThemeModalComponent', () => {
  let component: EditThemeModalComponent;
  let fixture: ComponentFixture<EditThemeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditThemeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditThemeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
