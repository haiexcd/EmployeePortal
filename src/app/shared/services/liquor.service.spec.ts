import { TestBed } from '@angular/core/testing';

import { LiquorService } from './liquor.service';

describe('LiquorService', () => {
  let service: LiquorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
