import { TestBed } from '@angular/core/testing';

import { ProjetserviceService } from './projetservice.service';

describe('ProjetserviceService', () => {
  let service: ProjetserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
