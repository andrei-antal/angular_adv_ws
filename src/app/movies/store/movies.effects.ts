import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MovieService } from './../services/movie.service';
import * as MovieActions from './movies.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesEffects {
  constructor(private moviesService: MovieService, private actions$: Actions) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadMovies),
      mergeMap(() =>
        this.moviesService.getMoviesList().pipe(
          map((movies) => MovieActions.loadMoviesSuccess({ movies })),
          catchError((error) => of(MovieActions.loadMoviesFail(error)))
        )
      )
    )
  );
}
