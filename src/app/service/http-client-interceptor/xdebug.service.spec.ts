import { TestBed, inject } from '@angular/core/testing';

import { XdebugService } from './xdebug.service';

describe('XdebugService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XdebugService]
    });
  });

  it('should be created', inject([XdebugService], (service: XdebugService) => {
    expect(service).toBeTruthy();
  }));
});
