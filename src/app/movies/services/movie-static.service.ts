import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { v1 as uuid } from 'uuid';

import { Movie, MOVIES_LIST } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieStaticService {
  private moviesList: List<Movie>;

  constructor() {
    this.setMovies(MOVIES_LIST);
  }

  public get movies(): Movie[] {
    return this.moviesList.toArray();
  }

  public setMovies(movies: Movie[]) {
    this.moviesList = List(movies);
  }

  public getMovie(movieId: string): Movie {
    return this.moviesList.find(m => m.id === movieId);
  }

  public createMovie(movie: Movie): Movie {
    const newMovie = {
      ...movie,
      id: uuid(),
    };
    this.moviesList = this.moviesList.push(newMovie);
    return newMovie;
  }

  public updateMovie(movie: Movie) {
    const index = this.moviesList.findIndex(m => m.id === movie.id);
    this.moviesList = this.moviesList.set(index, movie);
  }

  public updateComment(movieId: string, newComment: string) {
    const index = this.moviesList.findIndex(movie => movie.id === movieId);
    this.moviesList = this.moviesList.setIn([index, 'comment'], newComment);
  }

  public deleteMovie(movieId: string) {
    const index = this.moviesList.findIndex(movie => movie.id === movieId);
    this.moviesList = this.moviesList.delete(index);
  }
}
