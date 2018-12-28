import {AppFormGroup} from '../app.form-group';
import {FormControl, Validators} from '@angular/forms';
import {Todo} from '../models/user';

export class TodoFormGroup extends AppFormGroup {
  controls = {
    label: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    complete: new FormControl(false, [
      Validators.required
    ]),
  };

  constructor(private todo: Partial<Todo> = {}) {
    super();
    this.setControls(this.controls);
    this.patchValue({...todo});
  }
}
