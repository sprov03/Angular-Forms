import {Address, LookupInfo, Model} from './user';
import {CollectionType, DateType, FormControlData, Hydrator, ModelType, UserLookup} from '../app.decorator';
import {FormControl, Validators} from '@angular/forms';
import {AppFormGroup} from '../app.form-group';
import * as moment from 'moment';
import {Store} from '../in-memory-data.service';

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

  // This will map the server time to the users local time
  @DateType()
  @FormControlData(moment().format(moment.HTML5_FMT.DATETIME_LOCAL), [
    Validators.required,
  ])
  startTime: moment.Moment;

  // This will map the server time to the users local time
  @DateType()
  @FormControlData(moment().add(1, 'hours').format(moment.HTML5_FMT.DATETIME_LOCAL), [
    Validators.required,
  ])
  endTime: moment.Moment;
}

export class Property extends Model {
  // Custom Hydrator
  @Hydrator((model: Model) => {
    const user = Store.users.find(u => u.id === model['deletedById']);
    if (user) {
      model['deletedBy'] = {
        id: model['deletedById'],
        displayLabel: user.displayLabel
      };
    }
  })

  @FormControlData(null, [Validators.required])
  id: string;

  @CollectionType(Contact)
  contacts: Contact[];

  @ModelType(Address)
  address: Address;

  @CollectionType(Appointment)
  appointments: Appointment[];

  @FormControlData('1', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  createdById: string;

  @UserLookup('createdById')
  createdBy: LookupInfo;

  @FormControlData('1', [Validators.required])
  updatedById: string;

  // UserLookup Hydrator
  @UserLookup('updatedById')
  updatedBy: LookupInfo;

  @FormControlData('1', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  deletedById: string;

  // @UserLookup('deletedById')
  // Replaced this one with the custom hydrator for example
  deletedBy: LookupInfo;
}
