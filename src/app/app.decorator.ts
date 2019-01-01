import {Model} from './models/user';
import {Store} from './in-memory-data.service';
import {ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

function setHydrator (target, key, hydrator: (model: any) => void) {
  if (!target.hydrators) {
    target.hydrators = [];
  }

  target.hydrators.push(hydrator);
}

export function Hydrator(hydrator: (model: Model) => void) {
  return (target, key) => {
    setHydrator(target, key, hydrator);
  };
}

export function UserLookup(lookupKey: string) {
  return (target, key) => {
    setHydrator(target, key, (model: any) => {
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
    setHydrator(target, key, (model: any) => {
      const serverValue = model[key];
      if (serverValue) {
        model[key] = moment(serverValue);
      }
    });

    setFormControlData(target, key, {
      dataMap: (date: moment.Moment) => {
        return date.format(moment.HTML5_FMT.DATETIME_LOCAL);
      }
    });
  };
}

export function ModelType (classRef: typeof Model, validators: ValidatorFn[] = []) {
  return (target, key) => {
    setHydrator(target, key, (model: any) => {
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
      validators: validators
    });

    setHydrator(target, key, (model: any) => {
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
    target.formControlData.controls[key].type = formControlData.type;
    target.formControlData.controls[key].defaultValue = formControlData.defaultValue;
    target.formControlData.controls[key].validators = formControlData.validators;
    if (formControlData.dataMap) {
      target.formControlData.controls[key].dataMap = formControlData.dataMap;
    }
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
