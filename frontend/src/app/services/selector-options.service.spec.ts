import { TestBed } from '@angular/core/testing';

import { SelectorOptionsService } from './selector-options.service';

describe('SelectorOptionsService', () => {
  let service: SelectorOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectorOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
