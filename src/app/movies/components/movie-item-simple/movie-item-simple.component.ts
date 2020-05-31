import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngi-movie-item-simple',
  templateUrl: './movie-item-simple.component.html',
  styleUrls: ['./movie-item-simple.component.scss'],
})
export class MovieItemSimpleComponent {
  public movie = {
    title: 'Star Wars Episode IX: The Rise of Skywalker',
    year: 2019,
    genre: 'Action, Adventure, Fantasy',
    plot:
      'The surviving Resistance faces the First Order once more in the final chapter of the Skywalker saga.',
    poster:
      'https://images-na.ssl-images-amazon.com/images/I/91rKEgY1qDL._SY679_@@._V1_SX300.jpg',
    comment: '',
  };
  public commentSaved = false;

  public saveComment() {
    this.commentSaved = !this.commentSaved;
  }

  public clearComment() {
    this.commentSaved = false;
    this.movie.comment = '';
  }

  public wordCount() {
    let countValue: number;
    if (!this.movie.comment || this.movie.comment.length === 0) {
      countValue = 0;
    } else {
      countValue = this.movie.comment.trim().replace(/  +/g, ' ').split(' ')
        .length;
    }
    return countValue;
  }
}
