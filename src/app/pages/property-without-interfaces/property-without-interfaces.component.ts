import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {Contact, Property, PropertyFormGroup} from '../../models/propertie';
import {Store} from '../../in-memory-data.service';
import {AppFormGroup} from '../../app.form-group';

@Component({
  selector: 'app-property-without-interfaces',
  templateUrl: './property-without-interfaces.component.html',
  styleUrls: ['./property-without-interfaces.component.scss']
})
export class PropertyWithoutInterfacesComponent implements OnInit {
  propertyFormGroup: AppFormGroup;
  store = Store;

  constructor(
    // private _propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.propertyFormGroup = new Property().toFormGroup();
  }

  addContact() {
    const contacts = this.propertyFormGroup.controls['contacts'] as FormArray;
    contacts.controls.push(new Contact().toFormGroup());
  }
}
