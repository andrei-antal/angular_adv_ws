import { Movie } from '../model/movie';
import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Dictionary
} from '@ngrx/entity';

import * as MoviesActions from './movies.actions';

const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>();

const initialEntityState = adapter.getInitialState();

export interface MovieState {
  movies: EntityState<Movie>;
  loading: boolean;
  error: any;
}

const initialState: MovieState = {
  movies: initialEntityState,
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
    movies: adapter.setAll(movies, state.movies),
  })),
  on(MoviesActions.loadMoviesFail, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MoviesActions.addMovie, (state, movie) => ({
    ...state,
    movies: adapter.addOne(movie, state.movies),
  })),
  on(MoviesActions.updateMovieSuccess, (state, movie) => ({
    ...state,
    movies: adapter.updateOne(movie, state.movies)
  }))
);

export function reducer(state: MovieState | undefined, action: Action) {
  return moviesReducer(state, action);
}

const getMovies = (state: MovieState): Movie[] =>
  adapter.getSelectors().selectAll(state.movies);

const getMoviesFeatureState = createFeatureSelector<MovieState>(
  'moviesFeature'
);

export const getAllMovies = createSelector<MovieState, MovieState, Movie[]>(
  getMoviesFeatureState,
  getMovies
);

export const getMovieEntities = (state: MovieState): Dictionary<Movie> =>
  adapter.getSelectors().selectEntities(state.movies);

export const getAllEntities = createSelector<MovieState, MovieState, Dictionary<Movie>>(
  getMoviesFeatureState,
  getMovieEntities,
);

export const getMovieById = createSelector(
  getAllEntities,
  (movies: Dictionary<Movie>, props: { movieId: string }) => movies[props.movieId]
);
