import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() groupErrors: string[] = [];
  @Input() control: FormControl;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }
}
