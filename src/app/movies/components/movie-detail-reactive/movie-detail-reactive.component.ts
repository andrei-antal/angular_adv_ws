import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Movie } from '../../model/movie';

@Component({
  selector: 'ngi-movie-detail-reactive',
  templateUrl: './movie-detail-reactive.component.html',
  styleUrls: ['./movie-detail-reactive.component.scss'],
})
export class MovieDetailReactiveComponent implements OnInit {
  public movieForm: FormGroup = this.fb.group({
    title: this.fb.control(''),
    genre: this.fb.control(''),
    year: this.fb.control(''),
    plot: this.fb.control(''),
    poster: this.fb.control(''),
  });
  private movieId: string;
  private movie: Movie;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((paramsMap): string => paramsMap.get('id')),
      tap((movieId) => (this.movieId = movieId)),
      switchMap((movieId) =>
        this.movieService
          .getMovie(movieId)
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
      this.movieService.createMovie(modifiedMovie).subscribe(this.goBack);
    } else {
      this.movieService.updateMovie(modifiedMovie).subscribe(this.goBack);
    }
  }

  goBack = () => {
    this.router.navigate(['/movies']);
  };
}
