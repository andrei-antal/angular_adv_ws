import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { MovieService } from '../../services/movie.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Movie } from '../../model/movie';
import { MoviesValidatorsService } from '../../services/movies-validators.service';
import { MovieState, getMovieById } from '../../store/movies.reducers';
import { addMovie, updateMovie } from '../../store/movies.actions';

@Component({
  selector: 'ngi-movie-detail-reactive',
  templateUrl: './movie-detail-reactive.component.html',
  styleUrls: ['./movie-detail-reactive.component.scss'],
})
export class MovieDetailReactiveComponent implements OnInit {
  public movieForm: FormGroup = this.fb.group({
    title: this.fb.control('', Validators.required),
    genre: this.fb.control('', {
      updateOn: 'blur',
      validators: Validators.required,
      asyncValidators: this.movieValidators.genreAsync.bind(this)
    }),
    year: this.fb.control('', Validators.required),
    plot: this.fb.control('', Validators.required),
    poster: this.fb.control(''),
  });
  private movieId: string;
  private movie: Movie;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private movieValidators: MoviesValidatorsService,
    private store: Store<MovieState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
        map((paramsMap): string => paramsMap.get('id')),
        tap((movieId) => (this.movieId = movieId)),
        switchMap((movieId) =>
          this.store.pipe(select(getMovieById, { movieId }))
            .pipe(tap((movie) => (this.movie = movie)))
        )
      ).subscribe(movie => {
        this.movieForm.patchValue(movie);
      });
  }

  onSubmit() {
    const { value } = this.movieForm;
    const modifiedMovie = {
      ...this.movie,
      ...value,
    };
    if (!this.movieId) {
      this.store.dispatch(addMovie(modifiedMovie));
    } else {
      this.store.dispatch(updateMovie(modifiedMovie));
    }
    this.goBack();
  }

  goBack = () => {
    this.router.navigate(['/movies']);
  };
}
