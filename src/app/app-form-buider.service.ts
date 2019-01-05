import { Injectable } from '@angular/core';
import {AppFormGroup} from './app.form-group';
import {FormArray, FormControl} from '@angular/forms';
import {Formable} from './models/formable';

@Injectable({
  providedIn: 'root'
})
export class AppFormBuilder {
  static buildForm<T extends AppFormGroup>(formGroupRef: typeof AppFormGroup, model: Formable): T {
    const formGroup = new formGroupRef();
    if (!model.formControlData) {
      return formGroup as T;
    }
    formGroup.setValidators(model.formControlData.group.validators);

    for (const key in model.formControlData.controls) {
      const data = model.formControlData.controls[key];
      if (data.type === 'FormControl') {
        // Overwrite default value
        if (model[key] !== null && model[key] !== undefined) {
          if (data.dataMap) {
            data.defaultValue = data.dataMap(model[key]);
          } else {
            data.defaultValue = model[key];
          }
        }
        if (data.demapper) {
          formGroup.setDemapper(data.demapper);
        }

        formGroup.setControl(key, new FormControl(data.defaultValue, data.validators));
      }
      if (data.type === 'FormGroup') {
        const subFormGroup = model[key].toFormGroup();
        subFormGroup.setValidators(data.validators);
        if (data.demapper) {
          subFormGroup.setDemapper(data.demapper);
        }
        formGroup.setControl(key, subFormGroup);
      }
      if (data.type === 'FormArray') {
        const formArray = new FormArray([], data.validators);
        if (model[key]) {
          model[key].forEach(subModel => {
            const subFormGroup = subModel.toFormGroup();
            if (data.demapper) {
              subFormGroup.setDemapper(data.demapper);
            }
            formArray.controls.push(subFormGroup);
          });
        }
        formGroup.setControl(key, formArray);
      }
    }

    return formGroup as T;
  }
}
