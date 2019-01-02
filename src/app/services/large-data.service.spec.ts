import { TestBed } from '@angular/core/testing';

import { LargeDataService } from './large-data.service';

describe('LargeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LargeDataService = TestBed.get(LargeDataService);
    expect(service).toBeTruthy();
  });
});
