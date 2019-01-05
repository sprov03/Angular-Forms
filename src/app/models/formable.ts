import {ValidatorFn} from '@angular/forms';
import {AppFormGroup} from '../app.form-group';
// import {Injectable} from '@angular/core';

// @Injectable({providedIn: 'root'})
export interface Formable  {
  formControlData?: {
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

  toFormGroup(): AppFormGroup;
}
