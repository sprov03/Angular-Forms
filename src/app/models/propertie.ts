import {Address, LookupInfo, Model} from './user';
import {CollectionType, DateType, FormControlData, ModelType, UserLookup} from '../app.decorator';
import {Validators} from '@angular/forms';
import * as moment from 'moment';
import {Store} from '../in-memory-data.service';

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
  @FormControlData(null, [Validators.required])
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
  constructor(property: Partial<Property> = {}) {
    super(property);

    // Custom Mappings
    const user = Store.users.find(u => u.id === this.deletedById);
    if (user) {
      this.deletedBy = {
        id: this.deletedById,
        displayLabel: user.displayLabel
      };
    }
  }

  @FormControlData(null, [Validators.required])
  id: string;

  @CollectionType(Contact)
  contacts: Contact[];

  @ModelType(Address)
  address: Address;

  @CollectionType(Appointment)
  appointments: Appointment[];

  createdById: string;
  @UserLookup('createdById')
  createdBy: LookupInfo;

  // This is here just for a an exampe of a dropdown seteup
  @FormControlData(null, [])
  updatedById: string;
  // UserLookup Hydrator
  @UserLookup('updatedById')
  updatedBy: LookupInfo;

  deletedById: string;
  // @UserLookup('deletedById')
  // Replaced this one with an example of a custom mapping in the constructor
  deletedBy: LookupInfo;
}
