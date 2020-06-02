import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { first } from 'rxjs/operators';

describe('MovieService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: MovieService = TestBed.inject(MovieService);
    expect(service).toBeTruthy();
  });

  it('should correctly update a movie comment', () => {
    // Arrange
    const service: MovieService = TestBed.inject(MovieService);

    // Act
    service.updateComment('1', 'Comment').subscribe(async () => {
      // Assert
      const movies = await service.movies$.pipe(first()).toPromise();
      expect(movies.find((m) => m.id === '1').comment).toBe('Comment');
    });

    const reqPatch = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(reqPatch.request.method).toBe('PATCH');
    reqPatch.flush({});

    const reqGet = httpTestingController.expectOne(`${service.apiUrl}?q=`);
    expect(reqGet.request.method).toBe('GET');
    reqGet.flush([{ id: 1, comment: 'Comment' }]);
  });

  it('should correctly delete a movie', async () => {
    // Arrange
    const service: MovieService = TestBed.inject(MovieService);
    const initialMoviesLength = 3;

    // Act
    service.deleteMovie('1').subscribe(async () => {
      // Assert
      const movies = await service.movies$.pipe(first()).toPromise();
      expect(movies.find((m) => m.id === '1')).toBeUndefined();
      expect(movies.length).toBe(initialMoviesLength - 1);
    });

    const reqDelete = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(reqDelete.request.method).toBe('DELETE');
    reqDelete.flush({});

    const reqGet = httpTestingController.expectOne(`${service.apiUrl}?q=`);
    expect(reqGet.request.method).toBe('GET');
    reqGet.flush([{}, {}]);
  });
});
