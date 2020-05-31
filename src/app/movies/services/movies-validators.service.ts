import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { MovieService } from './movie.service';

export const genresArray = [
  'action',
  'adventure',
  'comedy',
  'crime',
  'drama',
  'fantasy',
  'historical',
  'horror',
  'mystery',
  'romance',
  'satire',
  'science fiction',
  'thriller',
  'western',
];

@Injectable({
  providedIn: 'root'
})
export class MoviesValidatorsService {

  constructor(private movieService: MovieService) { }

  genreSync(formControl: FormControl): ValidationErrors {
    const movieGenres: string[] =
      formControl.value &&
      formControl.value.split(',').map((g: string) => g.trim());
    return movieGenres &&
      movieGenres.reduce((acc, curr) => {
        return acc && genresArray.includes(curr.toLowerCase());
      }, true)
      ? null
      : { wrongGenre: true };
  }

  genreAsync(formControl: FormControl): Observable<ValidationErrors>{
    return this.movieService.getGenres().pipe(
      switchMap(genres => {
        const movieGenres: string[] =
          formControl.value &&
          formControl.value.split(',').map((g: string) => g.trim());
        return of(
          movieGenres &&
            movieGenres.reduce((acc, curr) => {
              return acc && genres.includes(curr.toLowerCase());
            }, true)
            ? null
            : { wrongGenre: true }
        );
      })
    );
  };
}
