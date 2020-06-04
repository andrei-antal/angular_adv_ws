import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MovieState, getAllMovies } from '../../store/movies.reducers';

import { Movie } from '../../model/movie';
import { CommentUpdate } from '../movie-item/movie-item.component';
import { MovieService } from '../../services/movie.service';
import { debounceTime, startWith, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngi-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  public movies$: Observable<Movie[]>;
  public searchField = new FormControl('');
  private destroy$ = new Subject();

  constructor(private store: Store<MovieState>) {}

  ngOnInit() {
    this.movies$ = this.store.pipe(
      select(getAllMovies),
      tap((state) => {
        console.log(state);
      })
    );
  }

  // ngAfterViewInit(): void {
  //   this.movies$ = this.movieService.movies$;
  //   this.searchField.valueChanges
  //     .pipe(
  //       debounceTime(300),
  //       startWith(''),
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe((searchTerm) => this.movieService.getMovies(searchTerm));
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackByFn(_: any, movie: Movie): string {
    return movie.id;
  }

  public handleCommentUpdate(commentPayload: CommentUpdate) {
    // this.movieService
    //   .updateComment(commentPayload.id, commentPayload.newComment)
    //   .subscribe();
  }

  handleMovieDelete(movieId: string) {
    // this.movieService.deleteMovie(movieId).subscribe();
  }
}
