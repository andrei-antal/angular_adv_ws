import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie';
import { MovieStaticService } from '../../services/movie-static.service';

@Component({
  selector: 'ngi-movie-list-static',
  templateUrl: './movie-list-static.component.html',
  styleUrls: ['./movie-list-static.component.scss'],
})
export class MovieListStaticComponent implements OnInit {
  public movies: Movie[] = [];

  constructor(public movieService: MovieStaticService) {}

  ngOnInit() {}

  public handleCommentUpdate(commentPayload: { id: string; newComment: string }) {
    this.movieService.updateComment(commentPayload.id, commentPayload.newComment);
  }

  public handleMovieDelete(movieId: string) {
    this.movieService.deleteMovie(movieId);
  }

  public trackByFn(_: any, movie: Movie) {
    return movie.id;
  }
}
