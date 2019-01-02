import {Component, Input, OnInit} from '@angular/core';
import {AppFormGroup} from '../../../app.form-group';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  @Input() formGroup: AppFormGroup;
  constructor() { }

  ngOnInit() {
  }
}
