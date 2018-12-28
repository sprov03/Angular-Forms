import {Component, Input, OnInit} from '@angular/core';
import {CatFormGroup} from '../../form-groups/cat.form-group';

@Component({
  selector: 'app-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.scss']
})
export class CatFormComponent implements OnInit {
  @Input() catFormGroup: CatFormGroup;
  constructor() { }

  ngOnInit() {
  }
}
