import { Component, OnInit } from '@angular/core';
import {Todo, User} from '../../models/user';
import {TodoFormGroup, UserFormGroup, UserService} from '../../services/user.service';

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
    this.userService.getUser('1').subscribe(user => {
      this.userFormGroup = user.toFormGroup() as UserFormGroup;
      this.user = user;
      console.log('User: ', user.formControlData);
      console.log('formgrop: ', this.user.toFormGroup().getRawValue());
    });
  }

  addTodo() {
    this.userFormGroup.controls.todos.controls.push(new Todo().toFormGroup() as TodoFormGroup);
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
