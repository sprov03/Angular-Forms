import {CollectionType, FormControlData, ModelType, UserLookup} from '../app.decorator';
import {AppFormGroup} from '../app.form-group';
import {FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

export class Model {
  // hydrators?: {[key: string]: (model: Model) => any};
  hydrators: ((model: Model) => any)[];
  formControlData: {
    group: {
      type: string,
      defaultValue: any,
      validators: ValidatorFn[],
      dataMap: (value: any) => any,
      demapper: (rawValue: any) => any
    },
    controls: {
      [key: string]: {
        type: string,
        defaultValue: any,
        validators: ValidatorFn[],
        dataMap: (value: any) => any,
        demapper: ((rawValue: any) => any)
      }
    }
  };

  constructor (model = {}) {
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
    const formGroup = new AppFormGroup();
    if (!this.formControlData) {
      return formGroup;
    }
    formGroup.setValidators(this.formControlData.group.validators);

    for (const key in this.formControlData.controls) {
      const data = this.formControlData.controls[key];
      if (data.type === 'FormControl') {
        // Overwrite default value
        if (this[key] !== null && this[key] !== undefined) {
          if (data.dataMap) {
            data.defaultValue = data.dataMap(this[key]);
          } else {
            data.defaultValue = this[key];
          }
        }
        if (data.demapper) {
          formGroup.setDemapper(data.demapper);
        }

        formGroup.setControl(key, new FormControl(data.defaultValue, data.validators));
      }
      if (data.type === 'FormGroup') {
        const subFormGroup = this[key].toFormGroup();
        subFormGroup.setValidators(data.validators);
        if (data.demapper) {
          subFormGroup.setDemapper(data.demapper);
        }
        formGroup.setControl(key, subFormGroup);
      }
      if (data.type === 'FormArray') {
        const formArray = new FormArray([], data.validators);
        if (this[key]) {
          this[key].forEach(model => {
            const subFormGroup = model.toFormGroup();
            if (data.demapper) {
              subFormGroup.setDemapper(data.demapper);
            }
            formArray.controls.push(subFormGroup);
          });
        }
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

  @CollectionType(Todo, [Validators.required])
  todos: Todo[];

  @ModelType(Address, [Validators.required])
  address: Address;
}
