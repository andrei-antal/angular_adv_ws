import { TestBed } from '@angular/core/testing';

import { MovieStaticService } from './movie-static.service';

describe('MovieStaticService', () => {
  let service: MovieStaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieStaticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
