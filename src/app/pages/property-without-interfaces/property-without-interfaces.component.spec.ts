import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyWithoutInterfacesComponent } from './property-without-interfaces.component';

describe('PropertyWithoutInterfacesComponent', () => {
  let component: PropertyWithoutInterfacesComponent;
  let fixture: ComponentFixture<PropertyWithoutInterfacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyWithoutInterfacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyWithoutInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
