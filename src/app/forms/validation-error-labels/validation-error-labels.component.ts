import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-validation-error-labels',
  templateUrl: './validation-error-labels.component.html',
  styleUrls: ['./validation-error-labels.component.scss']
})
export class ValidationErrorLabelsComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() control: FormControl;
  @Input() label: string;
  @Input() groupErrors: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  groupErrorFilter(error: {type: string, message: any}) {
    return this.groupErrors.includes(error.type);
  }
}
