import {Hydrate, HydrationType} from '../app.decorator';

class Model {
  hydrators?: {[key: string]: (model: Model) => any};
  constructor (model) {
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        this[key] = model[key] ;
      }
    }

    if (this.hydrators) {
      for (const key in this.hydrators) {
        if (this.hydrators.hasOwnProperty(key)) {
          this.hydrators[key](this);
        }
      }
    }
  }
}

export class User extends Model {
  id: string;
  @Hydrate(HydrationType.OverWrite, 'firstNameOverWrite')
  firstName: string;
  // @Hydrate()
  lastName: string;
  todos: Todo[];
}

export class Todo {
  userId: string;
  label: string;
  description: string;
  completed: boolean;
}
