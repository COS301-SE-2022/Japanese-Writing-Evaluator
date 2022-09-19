import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouteguardService } from './routeguard.service';

describe('RouteguardService', () => {
  let service: RouteguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule]
    });
    service = TestBed.inject(RouteguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
