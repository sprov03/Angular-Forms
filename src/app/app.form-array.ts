import {AbstractControl, FormArray} from '@angular/forms';

export class AppFormArray<T extends AbstractControl> extends FormArray {
  controls: T[];
}
