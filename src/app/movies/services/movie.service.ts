import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: Subject<Movie[]> = new Subject();
  private apiUrl = 'http://localhost:3000/movies';
  public readonly movies$: Observable<Movie[]> = this.movies.asObservable();

  constructor(private http: HttpClient) {}

  getMovie(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${movieId}`);
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
