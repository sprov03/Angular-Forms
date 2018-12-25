import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class AppFormGroup<T> extends FormGroup {
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

  getRawValue(): T {
    return super.getRawValue();
  }
}
