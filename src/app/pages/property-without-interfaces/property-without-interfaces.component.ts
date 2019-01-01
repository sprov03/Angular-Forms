import { Component, OnInit } from '@angular/core';
import {FormArray} from '@angular/forms';
import {Appointment, Contact, Property} from '../../models/propertie';
import {Store} from '../../in-memory-data.service';
import {AppFormGroup} from '../../app.form-group';
import {PropertyService} from '../../services/property.service';

@Component({
  selector: 'app-property-without-interfaces',
  templateUrl: './property-without-interfaces.component.html',
  styleUrls: ['./property-without-interfaces.component.scss']
})
export class PropertyWithoutInterfacesComponent implements OnInit {
  propertyFormGroup: AppFormGroup;
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
    this.propertyFormGroup = this.property.toFormGroup();
    this.addAppointment();
    this.addContact();
    console.log('From Group: ', this.propertyFormGroup.getRawValue().appointments[0]);
  }

  addContact() {
    const contacts = this.propertyFormGroup.controls['contacts'] as FormArray;
    contacts.controls.push(new Contact().toFormGroup());
  }

  saveProperty() {
    this._propertyService.createProperty(this.propertyFormGroup).subscribe(property => {
      this.property = property;
      this.propertyFormGroup = property.toFormGroup();
    });
  }

  addAppointment() {
    const appointments = this.propertyFormGroup.controls['appointments'] as FormArray;
    appointments.controls.push(new Appointment().toFormGroup());
  }
}
