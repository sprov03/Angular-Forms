import { Injectable } from '@angular/core';
import {AppFormGroup} from '../app.form-group';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {AppFormArray} from '../app.form-array';
import {TodoFormGroup} from '../form-groups/todo.form-group';
import {User} from '../models/user';

export class CreateUserFormGroup extends AppFormGroup {
  controls = {
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    todos: new AppFormArray<TodoFormGroup>([])
  };

  constructor () {
    super();
    this.setControls(this.controls);
  }
}

export class UpdateUserFormGroup extends CreateUserFormGroup {
  constructor (private user: User) {
    super();
    this.setControl('id', new FormControl(user.id));
    this.patchValue({...user});
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(createUserFromGroup: CreateUserFormGroup) {
    return this.http.post<User>('api/users', createUserFromGroup.getRawValue());
  }

  updateUser(updateUserFormGroup: UpdateUserFormGroup) {
    return this.http.put<User>('api/users', updateUserFormGroup.getRawValue());
  }
}
