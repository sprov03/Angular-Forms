import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {AppFormArray} from './app.form-array';
import {Model} from './models/user';

@Injectable({providedIn: 'root'})
export class AppFormGroup extends FormGroup {
  demappers: ((rawValue: any) => any)[] = [];
  constructor() {
    super({});
  }

  setDemapper(demapper: (rawValue: any) => any) {
   this.demappers.push(demapper);
  }

  setControls(controls: {[key: string]: AbstractControl | any}) {
    for (const key in controls) {
      this.setControl(key, controls[key]);
    }
  }

  setCollectionData(formArray: AppFormArray<any>, dataTypeRef: typeof Model, collection: Model[]) {
    if (collection) {
      collection.forEach(data => {
        formArray.controls.push(new dataTypeRef(data).toFormGroup());
      });
    }
  }

  showErrors(formGroup: FormGroup | FormArray = this): void {
    for (const key in formGroup.controls) {
      const control = formGroup.controls[key];
      if (control instanceof FormControl) {
        control.markAsDirty();
        control.markAsTouched();
      } else {
        this.showErrors(control as FormGroup);
      }
    }
  }

  isInvalidRecursive(formGroup: FormGroup | FormArray = this): boolean {
    if (formGroup.invalid) {
      return true;
    }

    for (const key in formGroup.controls) {
      const control = formGroup.controls[key];
      if (control instanceof FormControl) {
        if (control.invalid) {
          return true;
        }
      } else {
        if (this.isInvalidRecursive(control as FormGroup)) {
          return true;
        }
      }
    }

    return false;
  }

  getRawValue() {
    let rawValue = super.getRawValue();
    if (this.demappers) {
      this.demappers.forEach(demapper => {
        rawValue = demapper(rawValue);
      });
    }

    return rawValue;
  }
}
