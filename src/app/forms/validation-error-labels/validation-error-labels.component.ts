import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-validation-error-labels',
  templateUrl: './validation-error-labels.component.html',
  styleUrls: ['./validation-error-labels.component.scss']
})
export class ValidationErrorLabelsComponent implements OnInit {
  @Input() formControl: FormControl;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
