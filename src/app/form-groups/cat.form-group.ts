import {AppFormGroup} from '../app.form-group';
import {FormControl, Validators} from '@angular/forms';

export class CatFormGroup extends AppFormGroup {
  controls = {
    name: new FormControl('', [
      Validators.required,
    ]),
    color: new FormControl('', [
      Validators.required
    ]),
  };

  constructor() {
    super();
    this.setControls(this.controls);
    this.setValidators(this.nameAndColorAreRequired);
  }


  private nameAndColorAreRequired(catFormGroup: CatFormGroup) {
    if (catFormGroup.controls.color.value !== '' && catFormGroup.controls.name.value !== '') {
      return null;
    }

    return {
      nameAndColorAreRequired: 'Name and message are required.'
    };
  }
}

