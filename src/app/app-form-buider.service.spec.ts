import { TestBed } from '@angular/core/testing';

import { AppFormBuiderService } from './app-form-buider.service';

describe('AppFormBuiderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppFormBuiderService = TestBed.get(AppFormBuiderService);
    expect(service).toBeTruthy();
  });
});
