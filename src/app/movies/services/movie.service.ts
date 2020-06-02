import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v1 as uuid } from 'uuid';

import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: Subject<Movie[]> = new Subject();
  public apiUrl = 'http://localhost:3000/movies';
  public readonly movies$: Observable<Movie[]> = this.movies.asObservable();

  constructor(private http: HttpClient) {}

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/genres`);
  }

  getMovie(movieId: string): Observable<Movie> {
    if (!movieId) {
      return of({
        id: uuid(),
        title: '',
        genre: '',
        plot: '',
        year: null,
        comment: '',
        poster: '',
      });
    }
    return this.http.get<Movie>(`${this.apiUrl}/${movieId}`);
  }

  createMovie(movie: Movie) {
    return this.http.post(`${this.apiUrl}`, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.put(`${this.apiUrl}/${movie.id}`, movie);
  }

  getMovies(searchTerm = ''): void {
    this.http
      .get<Movie[]>(`${this.apiUrl}?q=${searchTerm.trim()}`)
      .subscribe((data) => this.movies.next(data));
  }

  updateComment(movieId: string, newComment: string): Observable<Movie> {
    return this.http
      .patch<Movie>(`${this.apiUrl}/${movieId}`, { comment: newComment })
      .pipe(tap(() => this.getMovies()));
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${movieId}`)
      .pipe(tap(() => this.getMovies()));
  }
}
