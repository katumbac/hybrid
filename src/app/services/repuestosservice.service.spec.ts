import { TestBed } from '@angular/core/testing';

import { RepuestosserviceService } from './repuestosservice.service';

describe('RepuestosserviceService', () => {
  let service: RepuestosserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepuestosserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
