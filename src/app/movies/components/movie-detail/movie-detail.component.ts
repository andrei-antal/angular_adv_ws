import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Movie } from '../../model/movie';
import { MovieService } from '../../services/movie.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngi-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  public movie$: Observable<Movie>;
  private movieId: string;
  private movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      map((paramsMap): string => paramsMap.get('id')),
      tap((movieId) => (this.movieId = movieId)),
      switchMap((movieId) =>
        this.movieService
          .getMovie(movieId)
          .pipe(tap((movie) => (this.movie = movie)))
      )
    );
  }

  onSubmit(form: NgForm) {
    const modifiedMovie = {
      ...this.movie,
      ...form.value,
    };
    if (!this.movieId) {
      this.movieService.createMovie(modifiedMovie).subscribe(this.goBack);
    } else {
      this.movieService
        .updateMovie(modifiedMovie)
        .subscribe(this.goBack);
    }
  }

  goBack = () => {
    this.router.navigate(['/movies']);
  };
}
