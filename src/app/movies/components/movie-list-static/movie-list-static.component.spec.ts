import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MovieListStaticComponent } from './movie-list-static.component';
import { MovieStaticService } from '../../services/movie-static.service';

const mockMovieService = {
  movies: [{ comment: '' }, { comment: '' }, { comment: '' }],
};

describe('MovieListStaticComponent', () => {
  let component: MovieListStaticComponent;
  let fixture: ComponentFixture<MovieListStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListStaticComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: MovieStaticService, useValue: mockMovieService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the movies list', () => {
    // Arrange + Act
    const moviesList: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      'ngi-movie-item'
    );

    // Assert
    expect(moviesList.length).toBe(mockMovieService.movies.length);
  });
});
