import { Movie } from '../model/movie';
import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';

import * as MoviesActions from './movies.actions';

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: any;
}

const initialState: MovieState = {
  movies: [
    {
      id: '1',
      title: 'Star Wars: The Last Jedi',
      year: 2017,
      genre: 'Action, Adventure, Fantasy',
      plot:
        'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
      poster:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg',
      comment: '',
    },
  ],
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
  })),
  on(MoviesActions.addMovie, (state, movie) => ({
    ...state,
    movies: [...state.movies, movie],
  }))
);

export function reducer(state: MovieState | undefined, action: Action) {
  return moviesReducer(state, action);
}

export const getMovies = (state: MovieState): Movie[] => state.movies;

const getMoviesFeatureState = createFeatureSelector<MovieState>(
  'moviesFeature'
);

export const getAllMovies = createSelector<MovieState, MovieState, Movie[]>(
  getMoviesFeatureState,
  getMovies
);
