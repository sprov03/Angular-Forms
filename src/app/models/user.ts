import {CollectionType, FormControlData, ModelType, UserLookup} from '../app.decorator';
import {AppFormGroup} from '../app.form-group';
import {Validators} from '@angular/forms';
import {Formable} from './formable';
import {AppFormBuilder} from '../app-form-buider.service';
import {AddressFormGroup, UserFormGroup} from '../services/user.service';

export class Model implements Formable {
  hydrators: ((model: Model) => any)[];
  formControlData?;

  constructor(model = {}) {
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        this[key] = model[key];
      }
    }

    if (this.hydrators) {
      this.hydrators.forEach(hydrator => {
        hydrator(this);
      });
    }
  }

   toFormGroup(): AppFormGroup {
    return AppFormBuilder.buildForm(AppFormGroup, this);
  }
}


export class LookupInfo {
  id: string;
  displayLabel: string;
}

export class Todo extends Model {
  userId: string;
  @UserLookup('userId')
  user: LookupInfo;

  @FormControlData('D', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  label: string;

  @FormControlData('D', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  description: string;
  completed: boolean;
}

export class Address extends Model {
  @FormControlData('De', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  street: string;

  @FormControlData('Default Values', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  zip: string;

  @FormControlData('Default Values', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  state: string;

  toFormGroup(): AddressFormGroup {
    return AppFormBuilder.buildForm(AddressFormGroup, this);
  }
}

export class User extends Model {
  @FormControlData(null, [])
  id: string;

  @FormControlData('D', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  firstName: string;

  @FormControlData('Default Values', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ])
  lastName: string;

  @CollectionType(Todo, [Validators.required])
  todos: Todo[];

  @ModelType(Address, [Validators.required])
  address: Address;

  toFormGroup(): UserFormGroup {
    return AppFormBuilder.buildForm(UserFormGroup, this);
  }
}
