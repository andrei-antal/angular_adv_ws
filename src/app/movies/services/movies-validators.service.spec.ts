import { TestBed } from '@angular/core/testing';

import { MoviesValidatorsService } from './movies-validators.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesValidatorsService', () => {
  let service: MoviesValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MoviesValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
