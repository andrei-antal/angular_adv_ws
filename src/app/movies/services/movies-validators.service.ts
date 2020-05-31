import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

export const genres = [
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

  constructor() { }

  genre(formControl: FormControl): ValidationErrors {
    const movieGenres: string[] =
      formControl.value &&
      formControl.value.split(',').map((g: string) => g.trim());
    return movieGenres &&
      movieGenres.reduce((acc, curr) => {
        return acc && genres.includes(curr.toLowerCase());
      }, true)
      ? null
      : { wrongGenre: true };
  }
}
