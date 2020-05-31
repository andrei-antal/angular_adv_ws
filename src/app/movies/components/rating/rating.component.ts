import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ngi-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnChanges {
  @Input() rating: number;
  @Output() ratingChange = new EventEmitter<number>();
  starStates = [false, false, false, false, false];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rating) {
      this.updateRating(changes.rating.currentValue);
    }
  }

  updateRating(newRating: number) {
    this.starStates = this.starStates.map((_, index) => index < newRating);
  }
}
