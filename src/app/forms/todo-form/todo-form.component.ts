import {Component, Input, OnInit} from '@angular/core';
import {TodoFormGroup} from '../../services/user.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @Input() formGroup: TodoFormGroup;

  constructor() { }

  ngOnInit() {
  }

  saveTodo() {
  }
}
