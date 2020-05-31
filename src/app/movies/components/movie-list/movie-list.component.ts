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
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngi-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements AfterViewInit, OnDestroy {
  public movies$: Observable<Movie[]> = this.movieService.movies$;
  @ViewChild('searchField') private searchField: ElementRef;
  private destroy$ = new Subject();

  constructor(public movieService: MovieService) {}

  ngAfterViewInit(): void {
    this.movies$ = this.movieService.movies$;
    fromEvent(this.searchField.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        map((ev: any) => ev.target.value),
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
