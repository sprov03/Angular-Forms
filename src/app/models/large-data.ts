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
  /**
   * This is just here to create a formgroup for the id,
   * Which will allow it to be sent to the server
   * (Which is a requirement and many of the apis currently)
   */
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

  /**
   * This Decorator sets form Control Meta Data that is
   * used when you call this.toFormGroup()
   */
  @FormControlData('Third Prop Default Value: ', [
    Validators.required,
    Validators.maxLength(10)
  ])
  thirdProp: string;

  /**
   * This Decorator dose several things.
   * 1: Sets a Hydration Method to Format the Date for the Model
   * 2: Sets a dataMapper to Format the Date When being casted to a formGroup
   * 3: Sets a demapper to prep the data from the formGroup for the Server
   *
   * This allows you to simply document that a property is a dateType and all the
   * date manipulation is taken care of.
   * (the date transforms are not correct in this repo but just used for demonstration purposes)
   */
  @DateType()
  updatedAt: moment.Moment;

  @DateType()
  createdAt: moment.Moment;

  /**
   * Sets a Hydration Method to set the createdBy property
   */
  @UserLookup('createdById')
  cratedBy: LookupInfo;
  createdById: string;

  @UserLookup('updatedById')
  updatedBy: LookupInfo;
  updatedById: string;

  /**
   * This Decorator dose 2 things, Not sure if this should be 2 Decorators or just this one
   * 1: Is used to call new Property(data) for each property provided in the constructor for this model
   * 2: Is used to set Form Meta Data used when calling toFormGroup()
   */
  @CollectionType(Property)
  properties: Property[];

  @CollectionType(User)
  users: User[];

  @CollectionType(Address)
  addresses: Address[];

  /**
   * This Decorator dose 2 things, Not sure if this should be 2 Decorators or just this one
   * 1: Is used to call new User(user) fore the user provided in the constructor for this model
   * 2: Is used to set Form Meta Data used when calling toFormGroup()
   */
  @ModelType(User)
  accountOwner: User;

  toFormGroup(): LargeDataFormGroup {
    return AppFormBuilder.buildForm(LargeDataFormGroup, this);
  }

  demoMethod() {
    const formGroup = this.toFormGroup();
    formGroup.addUser({
      firstName: 'Default User name',
      lastName: 'Overwriting Default defined in the model'
    });
    formGroup.addProperty();
    formGroup.addAddress();
    formGroup.controls.users.controls[0].addTodo();
    formGroup.controls.users.controls[0].addTodo();
    formGroup.controls.users.controls[0].addTodo();
    formGroup.controls.users.controls[0].addTodo();
    formGroup.controls.properties.controls[0].addContact({
      firstName: 'Testing First Name',
      lastName: 'Testing Last Name',
    });

    // Demonstrating how to utilize the strict typing
    const firstUserFirstAddressStreetName = formGroup.controls
      .users.controls
      [0].controls
      .address.controls
      .street;

    const firstPropertiesFirstContactDisplayLabel = formGroup.controls
      .properties.controls
      [0].controls
      .contacts.controls
      [0].controls
      .displayLabel;
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

  /**
   * A silly example of how to do something that is a little complicated
   * normally but is really simple with this approach,
   * while being centralized for code reuse.
   */
  setAddressesToSomethingFunny(funnyStreetName) {
    this.controls.addresses.controls.forEach(address => {
      address.controls.street.setValue(funnyStreetName);
    });
  }
}
