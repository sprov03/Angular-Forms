import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {CreateUserFormGroup, UpdateUserFormGroup, UserService} from '../../services/user.service';
import {TodoFormGroup} from '../../form-groups/todo.form-group';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user: User;
  userFormGroup: CreateUserFormGroup;
  updateUserFormGroup: UpdateUserFormGroup;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userFormGroup = new CreateUserFormGroup();
  }

  addTodo() {
    this.userFormGroup.controls.todos.controls.push(new TodoFormGroup());
  }

  createUser() {
    this.userService.createUser(this.userFormGroup).subscribe(user => {
      console.log('User: ', user);
      this.userFormGroup = new UpdateUserFormGroup(user);
    });
  }

  saveUser() {
    if (this.userFormGroup.isInvalidRecursive()) {
      this.userFormGroup.showErrors();
    }
  }
}
