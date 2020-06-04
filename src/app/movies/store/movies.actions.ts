import { createAction, props } from '@ngrx/store';
import { Movie } from '../model/movie';

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
