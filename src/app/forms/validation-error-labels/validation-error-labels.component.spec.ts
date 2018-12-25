import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorLabelsComponent } from './validation-error-labels.component';

describe('ValidationErrorLabelsComponent', () => {
  let component: ValidationErrorLabelsComponent;
  let fixture: ComponentFixture<ValidationErrorLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationErrorLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
