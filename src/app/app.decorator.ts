import {Model} from './models/user';
import {Store} from './in-memory-data.service';
import {ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

function setHydrator (target, hydrator: (model: any) => void) {
  if (!target.hydrators) {
    target.hydrators = [];
  }

  target.hydrators.push(hydrator);
}

export function Hydrator(hydrator: (model: Model) => void) {
  return (target) => {
    setHydrator(target, hydrator);
  };
}

export function UserLookup(lookupKey: string) {
  return (target, key) => {
    setHydrator(target, (model: any) => {
      const user = Store.users.find(u => u.id === model[lookupKey]);
      if (user) {
        model[key] = {
          id: model[lookupKey],
          displayLabel: user.displayLabel
        };
      }
    });
  };
}

export function DateType() {
  return (target, key) => {
    setHydrator(target, (model: any) => {
      const serverValue = model[key];
      if (serverValue) {
        model[key] = moment(serverValue);
      }
    });

    setFormControlData(target, key, {
      dataMap: (date: moment.Moment) => {
        return date.format(moment.HTML5_FMT.DATETIME_LOCAL);
      },
      demapper: (rawValue: any) => {
          if (rawValue[key]) {
            rawValue[key] = moment(rawValue[key]).add(6, 'hours').toISOString();
          }
          return rawValue;
        }
    });
  };
}

export function ModelType (classRef: typeof Model, validators: ValidatorFn[] = []) {
  return (target, key) => {
    setHydrator(target, (model: any) => {
      model[key] = new classRef(model[key]);
    });

    setFormControlData(target, key, {
      type: 'FormGroup',
      defaultValue: null,
      validators: validators
    });
  };
}

export function CollectionType (classRef: typeof Model, validators: ValidatorFn[] = []) {
  return (target, key) => {
    setFormControlData(target, key, {
      type: 'FormArray',
      defaultValue: null,
      validators: validators,
    });

    setHydrator(target, (model: any) => {
      if (!model[key]) {
        return;
      }
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
  } else if (target.formControlData.controls[key]) {
    target.formControlData.controls[key] = {
      ...target.formControlData.controls[key],
      ...formControlData
    };
  } else {
    target.formControlData.controls[key] = formControlData;
  }
}

export function FormControlData(defaultValue: any, validators: ValidatorFn[], dataMap?: (value: any) => any) {
  return (target, key) => {
    setFormControlData(target, key, {
      type: 'FormControl',
      defaultValue: defaultValue,
      validators: validators,
      dataMap: dataMap
    });
  };
}

export function FormGroupData(validators: ValidatorFn[]) {
  return (target: string, key: string) => {
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
