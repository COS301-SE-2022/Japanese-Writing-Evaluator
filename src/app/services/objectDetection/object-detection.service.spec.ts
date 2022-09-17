import { TestBed } from '@angular/core/testing';

import { ObjectDetectionService } from './object-detection.service';

describe('ObjectDetectionService', () => {
  let service: ObjectDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
