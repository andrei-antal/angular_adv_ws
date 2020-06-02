import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from '../../services/movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let httpTestingController: HttpTestingController;
  let service: MovieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the movies list', () => {
    // Arrange
    const mockMovies = [{ comment: '' }, { comment: '' }, { comment: '' }];
    let moviesList: HTMLElement[];

    // Act
    const reqGet = httpTestingController.expectOne(`${service.apiUrl}?q=`);
    expect(reqGet.request.method).toBe('GET');
    reqGet.flush(mockMovies);

    fixture.detectChanges();
    moviesList = fixture.nativeElement.querySelectorAll('ngi-movie-item');

    // Assert
    expect(moviesList.length).toBe(mockMovies.length);

    httpTestingController.verify();
  });
});
