import { Movie } from '../model/movie';
import { createReducer, on, Action } from '@ngrx/store';

import * as MoviesActions from './movies.actions';

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: any;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: undefined,
};

const moviesReducer = createReducer(
  initialState,
  on(MoviesActions.loadMovies, (state) => ({
    ...state,
    loading: true,
  })),
  on(MoviesActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    loading: false,
    error: undefined,
    movies,
  })),
  on(MoviesActions.loadMoviesFail, (state, error) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function reducer(state: MovieState | undefined, action: Action) {
  return moviesReducer(state, action);
}
