import {Address, LookupInfo, Model} from './user';
import {CollectionType, FormControlData, ModelType, UserLookup} from '../app.decorator';
import {FormControl, Validators} from '@angular/forms';
import {AppFormGroup} from '../app.form-group';

export interface PropertyFormGroup extends AppFormGroup {
  controls: {
    id: FormControl;
    createdById: FormControl;
  };
}

export class Contact extends Model {
  id: string;

  @FormControlData('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  firstName: string;

  @FormControlData('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  lastName: string;

  @FormControlData('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  displayLabel: string;
}

export class Appointment extends Model {
  @FormControlData(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  id: string;

  startTime: Date;

  endTime: Date;
}

export class Property extends Model {
  @FormControlData(null, [Validators.required])
  id: string;

  @CollectionType(Contact)
  contacts: Contact[];

  @ModelType(Address)
  address: Address;

  // appointments: Appointment[];

  @FormControlData('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  createdById: string;

  @UserLookup('createdById')
  createdBy: LookupInfo;

  @FormControlData('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  updatedById: string;

  @UserLookup('updatedById')
  updatedBy: LookupInfo;

  @FormControlData('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  deletedById: string;

  @UserLookup('deletedById')
  deletedBy: LookupInfo;
}
