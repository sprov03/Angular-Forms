import {AppFormGroup} from '../app.form-group';
import {FormControl, Validators} from '@angular/forms';

export class TodoFormGroup extends AppFormGroup {
  controls = {
    label: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    complete: new FormControl(false, [
      Validators.required
    ]),
  };

  constructor() {
    super();
    this.setControls(this.controls);
  }
}
