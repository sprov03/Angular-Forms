import { Injectable } from '@angular/core';
import {AppFormGroup} from '../app.form-group';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {AppFormArray} from '../app.form-array';
import {Address, Todo, User} from '../models/user';
import {map} from 'rxjs/operators';

// Ment to be passed directly into a service
export class UserFormGroup extends AppFormGroup {
  controls = {
    id: new FormControl(null, []),
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    todos: new AppFormArray<TodoFormGroup>([]),
    address: new Address().toFormGroup()
  };

  constructor (private user: Partial<User> = {}) {
    super();
    this.setControls(this.controls);
    this.patchValue({...user});

    this.setCollectionData(this.controls.todos, Todo, user.todos);
  }
}

export class TodoFormGroup extends AppFormGroup {
  controls: {
    label: FormControl;
    description: FormControl;
  };
}

export class AddressFormGroup extends AppFormGroup {
  controls: {
    zip: FormControl;
    state: FormControl;
    street: FormControl;
  };
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
