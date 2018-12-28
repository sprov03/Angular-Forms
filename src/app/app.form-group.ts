import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class AppFormGroup extends FormGroup {
  constructor() {
    super({});
  }

  setControls(controls: {[key: string]: AbstractControl | any}) {
    for (const key in controls) {
      this.setControl(key, controls[key]);
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
}
