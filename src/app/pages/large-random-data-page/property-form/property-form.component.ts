import {Component, Input, OnInit} from '@angular/core';
import {AppFormGroup} from '../../../app.form-group';
import {FormArray} from '@angular/forms';
import {Appointment, Contact} from '../../../models/propertie';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  @Input() formGroup: AppFormGroup;
  constructor() { }

  ngOnInit() {
    this.addContact({
      firstName: 'Shawn',
      lastName: 'Pivonka',
      displayLabel: 'Shawn Pivonka'
    });

    this.addAppointment();
  }

  addContact(contact?: Partial<Contact>) {
    const contacts = this.formGroup.get('contacts') as FormArray;
    contacts.controls.push(new Contact(contact).toFormGroup());
  }

  addAppointment(appointment?: Partial<Appointment>) {
    const appointments = this.formGroup.get('appointments') as FormArray;
    appointments.controls.push(new Appointment(appointment).toFormGroup());
  }
}
