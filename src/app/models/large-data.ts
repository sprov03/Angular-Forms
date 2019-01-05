import {Address, LookupInfo, Model, User} from './user';
import {CollectionType, DateType, FormControlData, ModelType, UserLookup} from '../app.decorator';
import {FormControl, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Property} from './propertie';
import {AppFormBuilder} from '../app-form-buider.service';
import {AppFormGroup} from '../app.form-group';
import {AppFormArray} from '../app.form-array';
import {PropertyFormGroup} from '../services/property.service';
import {AddressFormGroup, UserFormGroup} from '../services/user.service';

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

  toFormGroup(): LargeDataFormGroup {
    return AppFormBuilder.buildForm(LargeDataFormGroup, this);
  }
}

export class LargeDataFormGroup extends AppFormGroup {
  controls: {
    id: FormControl;
    firstProp: FormControl;
    secondProp: FormControl;
    thirdProp: FormControl;
    properties: AppFormArray<PropertyFormGroup>;
    users: AppFormArray<UserFormGroup>;
    addresses: AppFormArray<AddressFormGroup>;
    accountOwner: UserFormGroup;
  };

  addProperty(property?: Partial<Property>) {
    this.controls.properties.controls.push(new Property(property).toFormGroup());
  }

  addAddress(address?: Partial<Address>) {
    this.controls.addresses.controls.push(new Address(address).toFormGroup());
  }

  addUser(user?: Partial<User>) {
    this.controls.users.controls.push(new User(user).toFormGroup());
  }
}
