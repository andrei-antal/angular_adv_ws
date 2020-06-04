import { createAction, props } from '@ngrx/store';
import { Movie } from '../model/movie';
import { Update } from '@ngrx/entity';

export const loadMovies = createAction(
  '[Movies] Load movies'
);

export const loadMoviesSuccess = createAction(
  '[Movies] Load movies success',
  props<{movies: Movie[]}>()
);

export const loadMoviesFail = createAction(
  '[Movies] Load movies fail',
  props<any>()
);

export const addMovie = createAction('[Movie] Add movie', props<Movie>());

export const updateMovie = createAction(
  '[Movie] Update Movie',
  props<Movie>()
);

export const updateMovieSuccess = createAction(
  '[Movie] Update Movie Success',
  props<Update<Movie>>()
);
