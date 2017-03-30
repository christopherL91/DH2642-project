import { TestBed, inject } from '@angular/core/testing';

import { UserdataService } from './userdata.service';

describe('UserdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserdataService]
    });
  });

  it('should ...', inject([UserdataService], (service: UserdataService) => {
    expect(service).toBeTruthy();
  }));
});
