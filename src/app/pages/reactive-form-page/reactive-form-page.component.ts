import {Component, OnInit} from '@angular/core';
import {UserType} from '../../models/testing-user';
import {TestingFormGroup} from '../../form-groups/testing.form-group';

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
