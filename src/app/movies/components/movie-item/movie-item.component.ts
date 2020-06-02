import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Movie } from '../../model/movie';

export interface CommentUpdate {
  id: string;
  newComment: string;
}

@Component({
  selector: 'ngi-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnChanges {
  @Input() public movie: Movie;
  @Output() public commentUpdate = new EventEmitter<CommentUpdate>();
  @Output() public movieDelete = new EventEmitter<string>();

  public commentSaved: boolean;
  public movieComment: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.movie) {
      this.movieComment = changes.movie.currentValue.comment;
      this.commentSaved = this.movieComment.length > 0;
    }
  }

  public saveComment(): void {
    if (!this.commentSaved) {
      this.commentUpdate.emit({
        id: this.movie.id,
        newComment: this.movieComment,
      });
    } else {
      this.commentSaved = false;
    }
  }

  public clearComment(): void {
    this.commentUpdate.emit({
      id: this.movie.id,
      newComment: '',
    });
  }
}
