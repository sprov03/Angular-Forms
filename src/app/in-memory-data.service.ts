import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      largeData: [],
      properties: [],
      users: [
        {
          id: '1',
          firstName: 'Shawn',
          lastName: 'Pivonka',
          todos: [
            {
              userId: '1',
              label: 'woot',
              description: 'kdlfjs'
            },
            {
              userId: '1',
              label: 'woot',
              description: 'kdlfjs'
            },
            {
              userId: '1',
              label: 'woot',
              description: 'kdlfjs'
            },
            {
              userId: '1',
              label: 'woot',
              description: 'kdlfjs'
            },
            {
              userId: '1',
              label: 'woot',
              description: 'kdlfjs'
            },
          ],
          address: {
            street: '9730 Morningfield',
            zip: '78250',
            state: 'Texas'
          }
        }
      ]
    };
  }

  genId(): string {
    return new Date().getUTCMilliseconds().toString();
  }
}

export const Store = {
  users: [
    {id: '1', displayLabel: 'Shawn Pivonka'},
    {id: '2', displayLabel: 'Jessica Pivonka'},
    {id: '3', displayLabel: 'Aria Pivonka'},
    {id: '4', displayLabel: 'Rowan Pivonka'},
  ]
};

