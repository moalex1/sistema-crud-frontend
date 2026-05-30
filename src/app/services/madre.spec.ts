import { TestBed } from '@angular/core/testing';

import { Madre } from './madre';

describe('Madre', () => {
  let service: Madre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Madre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
