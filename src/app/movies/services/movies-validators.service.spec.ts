import { TestBed } from '@angular/core/testing';

import { MoviesValidatorsService } from './movies-validators.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { FormControl } from '@angular/forms';

describe('MoviesValidatorsService - static', () => {
  it('should validate genre', () => {
    // Arrange
    const validator = new MoviesValidatorsService({} as MovieService);
    const fc = new FormControl();
    fc.setValidators(validator.genreSync);

    // Act
    fc.setValue('action, thriller');
    // Assert
    expect(fc.status).toBe('VALID');

    // Act
    fc.setValue('comedy');
    // Assert
    expect(fc.status).toBe('VALID');

    // Act
    fc.setValue('action, thrlr');
    // Assert
    expect(fc.status).toBe('INVALID');

    // Act
    fc.setValue('cmdy');
    // Assert
    expect(fc.status).toBe('INVALID');
  });
});

describe('MoviesValidatorsService', () => {
  let service: MoviesValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MoviesValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
