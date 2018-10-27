import { TestBed, inject } from '@angular/core/testing';

import { PrintingService } from './printing.service';

describe('PrintingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintingService]
    });
  });

  it('should be created', inject([PrintingService], (service: PrintingService) => {
    expect(service).toBeTruthy();
  }));
});
