import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeRandomDataPageComponent } from './large-random-data-page.component';

describe('LargeRandomDataPageComponent', () => {
  let component: LargeRandomDataPageComponent;
  let fixture: ComponentFixture<LargeRandomDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeRandomDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeRandomDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
