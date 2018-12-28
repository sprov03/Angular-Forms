import {AppFormGroup} from '../app.form-group';
import {TestingUser, UserType} from '../models/testing-user';
import {FormArray, FormControl, Validators} from '@angular/forms';
import {AppFormArray} from '../app.form-array';
import {CatFormGroup} from './cat.form-group';

export class TestingFormGroup extends AppFormGroup {
  controls = {
    firstName: new FormControl('Sha', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(1),
      Validators.email
    ]),
    userType: new FormControl(UserType.Admin, [
      Validators.required
    ]),
    aliases: new FormArray([]),
    cats: new FormArray([
      new CatFormGroup(),
      new CatFormGroup(),
    ]) as AppFormArray<CatFormGroup>,
  };

  constructor() {
    super();
    this.setControls(this.controls);
  }

  addAlias() {
    this.controls.aliases.push(new FormControl('', Validators.minLength(3)));
  }

  removeAlias(index) {
    this.controls.aliases.removeAt(index);
  }

  addCat() {
    this.controls.cats.push(new CatFormGroup());
  }

  removeCat(index) {
    this.controls.cats.removeAt(index);
  }

  getRawValue(): TestingUser {
    // Remove extra cat form
    this.removeCat(this.controls.cats.controls.length);
    return super.getRawValue();
  }
}
