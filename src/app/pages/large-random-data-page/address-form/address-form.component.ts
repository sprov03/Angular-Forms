import {Component, Input, OnInit} from '@angular/core';
import {AppFormGroup} from '../../../app.form-group';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() formGroup: AppFormGroup;
  constructor() { }

  ngOnInit() {
  }
}
