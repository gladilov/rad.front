import { TestBed, inject } from '@angular/core/testing';

import { RevertToService } from './revert-to.service';

describe('RevertToService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevertToService]
    });
  });

  it('should be created', inject([RevertToService], (service: RevertToService) => {
    expect(service).toBeTruthy();
  }));
});
