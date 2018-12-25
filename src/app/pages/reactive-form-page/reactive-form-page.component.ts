import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, Validators} from '@angular/forms';
import {AppFormGroup} from '../../app.form-group';

@Component({
  selector: 'app-reactive-form-page',
  templateUrl: './reactive-form-page.component.html',
  styleUrls: ['./reactive-form-page.component.scss']
})
export class ReactiveFormPageComponent implements OnInit {
  UserType = UserType;
  formGroup = new TestingFormGroup();
  constructor() { }

  ngOnInit() {
  }

  logValue() {
    console.log('Value: ', this.formGroup.getRawValue());
  }
}

export class TestingFormGroup extends AppFormGroup<TestingUser> {
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
    this.controls.aliases.push(new FormControl(''));
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

export class TestingUser {
  firstName: string;
  userType: UserType;
  aliases: string[];
  cats: Cat[];
}

export class CatFormGroup extends AppFormGroup<Cat> {
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
  }
}

export class Cat {
  name: string;
  color: string;
}

export enum UserType {
  Tester,
  Admin,
}

export class AppFormArray<T extends AbstractControl> extends FormArray {
  controls: T[];
}
