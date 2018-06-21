import { TestBed, inject } from '@angular/core/testing';

import { DnsCheckService } from './dns-check.service';

describe('DnsCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DnsCheckService]
    });
  });

  it('should be created', inject([DnsCheckService], (service: DnsCheckService) => {
    expect(service).toBeTruthy();
  }));
});
