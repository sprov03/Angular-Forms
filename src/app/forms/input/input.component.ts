import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  // @Input() formControl: FormControl;
  @Input() formGroup: FormGroup;
  @Input() formControlName: string;

  constructor() { }

  ngOnInit() {
  }
}
