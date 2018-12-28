export class User {
  id: string;
  firstName: string;
  lastName: string;
  todos: Todo[];
}

export class Todo {
  userId: string;
  label: string;
  description: string;
  completed: boolean;
}
