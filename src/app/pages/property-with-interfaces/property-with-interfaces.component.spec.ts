import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyWithInterfacesComponent } from './property-with-interfaces.component';

describe('PropertyWithInterfacesComponent', () => {
  let component: PropertyWithInterfacesComponent;
  let fixture: ComponentFixture<PropertyWithInterfacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyWithInterfacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyWithInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
