import { Injectable } from '@angular/core';
import {AppFormGroup} from '../app.form-group';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {AppFormArray} from '../app.form-array';
import {TodoFormGroup} from '../form-groups/todo.form-group';
import {User} from '../models/user';
import {map} from 'rxjs/operators';

// Ment to be passed directly into a service
export class UserFormGroup extends AppFormGroup {
  controls = {
    id: new FormControl(null, []),
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    todos: new AppFormArray<TodoFormGroup>([]),
  };

  constructor (private user: Partial<User> = {}) {
    super();
    this.setControls(this.controls);
    this.patchValue({...user});

    user.todos.forEach(todo => {
      this.controls.todos.controls.push(new TodoFormGroup(todo));
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  createUser(createUserFromGroup: UserFormGroup) {
    return this.http.post<User>('api/users', createUserFromGroup.getRawValue())
      .pipe(map(user => new User(user)));
  }

  updateUser(updateUserFormGroup: UserFormGroup) {
    return this.http.put<User>('api/users', updateUserFormGroup.getRawValue())
      .pipe(map(user => new User(user)));
  }

  getUser(userId: string) {
    return this.http.get<User>('api/users/' + userId)
      .pipe(map(user => new User(user)));
  }
}
