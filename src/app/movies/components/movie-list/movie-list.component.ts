import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Observable, fromEvent, Subject } from 'rxjs';

import { Movie } from '../../model/movie';
import { CommentUpdate } from '../movie-item/movie-item.component';
import { MovieService } from '../../services/movie.service';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngi-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements AfterViewInit, OnDestroy {
  public movies$: Observable<Movie[]> = this.movieService.movies$;
  public searchField = new FormControl('');
  private destroy$ = new Subject();

  constructor(public movieService: MovieService) {}

  ngAfterViewInit(): void {
    this.movies$ = this.movieService.movies$;
    this.searchField.valueChanges
      .pipe(
        debounceTime(300),
        startWith(''),
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm) => this.movieService.getMovies(searchTerm));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackByFn(_: any, movie: Movie): string {
    return movie.id;
  }

  public handleCommentUpdate(commentPayload: CommentUpdate) {
    this.movieService
      .updateComment(commentPayload.id, commentPayload.newComment)
      .subscribe();
  }

  handleMovieDelete(movieId: string) {
    this.movieService.deleteMovie(movieId).subscribe();
  }
}
