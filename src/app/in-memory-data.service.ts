import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      users: [
        {
          id: 'kdkdkd',
          firstName: 'Shawn',
          lastName: 'Pivonka',
          todos: []
        }
      ]
    };
  }

  genId(): string {
    return new Date().getUTCMilliseconds().toString();
  }
}
