import {Model} from './models/user';
import {Store} from './in-memory-data.service';
import {ValidatorFn} from '@angular/forms';

function setHydrator (target, key, hydrator: (model: any) => void) {
  if (!target.hydrators) {
    target.hydrators = {};
  }

  target.hydrators[key] = hydrator;
}

export function UserLookup(lookupKey: string) {
  return (target, key) => {
    if (!target[lookupKey]) {
      return;
    }

    setHydrator(target, key, (model: any) => {
      model[key] = {
        id: model[lookupKey],
        displayLabel: Store.users.find(user => user.id === model[lookupKey]).displayLabel
      };
    });
  };
}


export function ModelType (classRef: typeof Model) {
  return (target, key) => {
    setHydrator(target, key, (model: any) => {
      model[key] = new classRef(model[key]);
    });
  };
}

export function CollectionType (classRef: typeof Model) {
  return (target, key) => {
    setHydrator(target, key, (model: any) => {
      model[key] = model[key].map(data => {
        return new classRef(data);
      });
    });
  };
}

function setFormControlData(target, key, formControlData) {
  if (!target.formControlData) {
    target.formControlData = {
      group: {validators: []},
      controls: {}
    };
  }
  if (!key) {
    target.formControlData.group = formControlData;
  } else {
    target.formControlData.controls[key] = formControlData;
  }
}

export function FormControlData(defaultValue: any, validators: ValidatorFn[]) {
  return (target, key) => {
    setFormControlData(target, key, {
      type: 'FormControl',
      defaultValue: defaultValue,
      validators: validators
    });
  };
}

export function FormGroupData(validators: ValidatorFn[]) {
  return (target, key) => {
    setFormControlData(target, key, {
      type: 'FormGroup',
      defaultValue: null,
      validators: validators
    });
  };
}

export function FormArrayData(validators: ValidatorFn[]) {
  return (target, key) => {
    setFormControlData(target, key, {
      type: 'FormArray',
      defaultValue: null,
      validators: validators
    });
  };
}
