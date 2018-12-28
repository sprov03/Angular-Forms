import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserFormGroup, UserService} from '../../services/user.service';
import {TodoFormGroup} from '../../form-groups/todo.form-group';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user: User;
  userFormGroup: UserFormGroup;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUser('kdkdkd').subscribe(user => {
      this.userFormGroup = new UserFormGroup(user);
    });
  }

  addTodo() {
    this.userFormGroup.controls.todos.controls.push(new TodoFormGroup());
  }

  createUser() {
    this.userService.createUser(this.userFormGroup).subscribe(user => {
      this.userFormGroup = new UserFormGroup(user);
    });
  }

  saveUser() {
    if (this.userFormGroup.isInvalidRecursive()) {
      this.userFormGroup.showErrors();
    }
  }
}
