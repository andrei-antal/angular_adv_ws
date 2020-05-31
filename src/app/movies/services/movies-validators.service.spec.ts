import { TestBed } from '@angular/core/testing';

import { MoviesValidatorsService } from './movies-validators.service';

describe('MoviesValidatorsService', () => {
  let service: MoviesValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
