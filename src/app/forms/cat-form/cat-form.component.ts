import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CatFormGroup} from '../../pages/reactive-form-page/reactive-form-page.component';

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
