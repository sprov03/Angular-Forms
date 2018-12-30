import {CollectionType, FormArrayData, FormControlData, FormGroupData, ModelType, UserLookup} from '../app.decorator';
import {AppFormGroup} from '../app.form-group';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

export class Model {
  hydrators?: {[key: string]: (model: Model) => any};
  formControlData: {
    [key: string]: {
      type: string,
      defaultValue: any,
      validators: ValidatorFn[]
    }
  };
  constructor (model = {}) {
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        this[key] = model[key];
      }
    }

    if (this.hydrators) {
      for (const key in this.hydrators) {
        if (this.hydrators.hasOwnProperty(key)) {
          this.hydrators[key](this);
        }
      }
    }
  }

  toFormGroup(): AppFormGroup {
    const formGroup = new AppFormGroup();

    formGroup.patchValue({...this}); // tslint:disable-line

    for (const key in this.formControlData) {
      const data = this.formControlData[key];
      if (data.type === 'FormControl') {
        formGroup.setControl(key, new FormControl(data.defaultValue, data.validators));
      }
      if (data.type === 'FormGroup') {
        const subFormGroup = this[key].toFormGroup();
        subFormGroup.setValidators(data.validators);
        formGroup.setControl(key, subFormGroup);
      }
      if (data.type === 'FormArray') {
        const formArray = new FormArray([], data.validators);
        this[key].forEach(model => {
          formArray.controls.push(model.toFormGroup());
        });
        formGroup.setControl(key, formArray);
      }
    }

    return formGroup;
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

  @FormArrayData([Validators.required])
  @CollectionType(Todo)
  todos: Todo[];

  @FormGroupData([Validators.required])
  @ModelType(Address)
  address: Address;
}