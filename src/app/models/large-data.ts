import {Address, LookupInfo, Model, User} from './user';
import {CollectionType, DateType, FormControlData, ModelType, UserLookup} from '../app.decorator';
import {Validators} from '@angular/forms';
import * as moment from 'moment';
import {Property} from './propertie';

export class LargeData extends Model {
  @FormControlData(null, [])
  id: string;

  @FormControlData('First Prop Default Value: ', [
    Validators.required,
    Validators.maxLength(10)
  ])
  firstProp: string;

  @FormControlData('Second Prop Default Value: ', [
    Validators.required,
    Validators.maxLength(10)
  ])
  secondProp: string;

  @FormControlData('Third Prop Default Value: ', [
    Validators.required,
    Validators.maxLength(10)
  ])
  thirdProp: string;

  @DateType()
  updatedAt: moment.Moment;

  @DateType()
  createdAt: moment.Moment;

  @UserLookup('createdById')
  cratedBy: LookupInfo;
  createdById: string;

  @UserLookup('updatedById')
  updatedBy: LookupInfo;
  updatedById: string;

  @CollectionType(Property)
  properties: Property[];

  @CollectionType(User)
  users: User[];

  @CollectionType(Address)
  addresses: Address[];

  @ModelType(User)
  accountOwner: User;
}
