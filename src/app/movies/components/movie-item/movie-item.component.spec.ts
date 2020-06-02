import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Movie } from '../../model/movie';
import { MovieItemComponent } from './movie-item.component';
import { WordCountPipe } from '../../pipes/word-count.pipe';
import { FormsModule } from '@angular/forms';

const MockMovie: Movie = {
  id: '1',
  title: 'Star Wars Episode IX: The Rise of Skywalker',
  year: 2019,
  genre: 'Action, Adventure, Fantasy',
  plot:
    'The surviving Resistance faces the First Order once more in the final chapter of the Skywalker saga.',
  poster:
    'https://images-na.ssl-images-amazon.com/images/I/91rKEgY1qDL._SY679_@@._V1_SX300.jpg',
  comment: '',
};

@Component({
  template: `
    <ngi-movie-item
      [movie]="movie"
      (commentUpdate)="update($event)"
    ></ngi-movie-item>
  `,
})
class TestMovieItemComponent {
  public movie = { ...MockMovie };
  public update(event) {}
}

describe('MovieItemComponent', () => {
  let component: TestMovieItemComponent;
  let fixture: ComponentFixture<TestMovieItemComponent>;
  let movieItemElement: HTMLElement;
  let saveCommentBtn: HTMLButtonElement;
  let commentElement: HTMLTextAreaElement;
  let clearCommentBtn: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestMovieItemComponent, MovieItemComponent, WordCountPipe],
      imports: [RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMovieItemComponent);
    component = fixture.componentInstance;
    movieItemElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly display the movie title', () => {
    const titleElement = movieItemElement.querySelector('[data-testId=title]');
    expect(titleElement.textContent).toContain(MockMovie.title);
  });

  it('should correctly dispatch an commentUpdate event when comment is cleared', () => {
    // Arrange
    clearCommentBtn = movieItemElement.querySelector(
      '[data-testId=clear-comment]'
    );
    component.movie = {
      ...component.movie,
      comment: 'Comment',
    };

    fixture.detectChanges();

    spyOn(component, 'update');

    // Act
    clearCommentBtn.click();
    fixture.detectChanges();

    // Assert
    expect(component.update).toHaveBeenCalledWith({
      id: MockMovie.id,
      newComment: '',
    });
  });

  it('should correctly dispatch an commentUpdate event when comment is saved', () => {
    // Arrange
    saveCommentBtn = movieItemElement.querySelector(
      '[data-testId=save-comment]'
    );
    commentElement = movieItemElement.querySelector('[data-testId=comment]');
    spyOn(component, 'update');

    commentElement.value = 'Comment';
    commentElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Act
    saveCommentBtn.click();
    fixture.detectChanges();

    // Assert
    expect(component.update).toHaveBeenCalledWith({
      id: MockMovie.id,
      newComment: 'Comment',
    });
  });
});
