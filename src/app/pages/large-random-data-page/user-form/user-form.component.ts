import {Component, Input, OnInit} from '@angular/core';
import {AppFormGroup} from '../../../app.form-group';
import {FormArray} from '@angular/forms';
import {Todo} from '../../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() formGroup: AppFormGroup;
  constructor() { }

  ngOnInit() {
    this.addTodo();
  }

  addTodo() {
    const todos = this.formGroup.get('todos') as FormArray;
    todos.controls.push(new Todo().toFormGroup());
  }
}
