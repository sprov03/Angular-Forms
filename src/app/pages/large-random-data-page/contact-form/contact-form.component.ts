import {Component, Input, OnInit} from '@angular/core';
import {AppFormGroup} from '../../../app.form-group';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() formGroup: AppFormGroup;
  constructor() { }

  ngOnInit() {
  }
}
