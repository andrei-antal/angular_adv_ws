import { Directive } from '@angular/core';
import {
  Validator,
  FormControl,
  ValidationErrors,
  NG_VALIDATORS
} from '@angular/forms';

@Directive({
  selector: '[ngiGenreValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: GenreValidatorDirective,
      multi: true
    }
  ]
})
export class GenreValidatorDirective implements Validator {
  private genres = [
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
    'western'
  ];

  validate(formControl: FormControl): ValidationErrors {
    const movieGenres: string[] =
      formControl.value &&
      formControl.value.split(',').map((g: string) => g.trim());
    return movieGenres &&
      movieGenres.reduce((acc, curr) => {
        return acc && this.genres.includes(curr.toLowerCase());
      }, true)
      ? null
      : { wrongGenre: true };
  }
}
