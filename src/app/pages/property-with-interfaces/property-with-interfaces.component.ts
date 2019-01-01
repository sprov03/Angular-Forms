import { Component, OnInit } from '@angular/core';
import {Store} from '../../in-memory-data.service';
import {Appointment, Contact, Property} from '../../models/propertie';
import {AppointmentFormGroup, ContactFormGroup, PropertyFormGroup, PropertyService} from '../../services/property.service';

@Component({
  selector: 'app-property-with-interfaces',
  templateUrl: './property-with-interfaces.component.html',
  styleUrls: ['./property-with-interfaces.component.scss']
})
export class PropertyWithInterfacesComponent implements OnInit {
  propertyFormGroup: PropertyFormGroup;
  store = Store;
  private property: Property;

  constructor(
    private _propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.property = new Property({
      deletedById: '1',
      createdById: '1',
      updatedById: '1'
    });
    this.propertyFormGroup = this.property.toFormGroup() as PropertyFormGroup;
    this.addAppointment();
    this.addContact();
  }

  addContact() {
    this.propertyFormGroup.controls
      .contacts.controls
      .push(new Contact().toFormGroup() as ContactFormGroup);
  }

  saveProperty() {
    this._propertyService.createProperty(this.propertyFormGroup).subscribe(property => {
      this.property = property;
      this.propertyFormGroup = property.toFormGroup() as PropertyFormGroup;
    });
  }

  addAppointment() {
    this.propertyFormGroup.controls
      .appointments.controls
      .push(new Appointment().toFormGroup() as AppointmentFormGroup);
  }
}
