import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { MovieItemSimpleComponent } from './movie-item-simple.component';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('MovieItemSimpleComponent', () => {
  let component: MovieItemSimpleComponent;
  let fixture: ComponentFixture<MovieItemSimpleComponent>;
  let movieItemDe: DebugElement;
  let movieItemEl: HTMLElement;

  let editCommentBtn: HTMLButtonElement;
  let readonlyCommentElement: HTMLDivElement;
  let editableCommentElement: HTMLDivElement;
  let commentElement: HTMLTextAreaElement;
  let wordsElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieItemSimpleComponent],
      imports: [FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieItemSimpleComponent);
    component = fixture.componentInstance;
    movieItemDe = fixture.debugElement;
    movieItemEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly display the movie title', () => {
    // Arrange + Act
    const titleElement: HTMLHeadingElement = movieItemDe.query(
      By.css('[data-testId=title]')
    ).nativeElement;
    // Assert
    expect(titleElement.textContent).toContain(
      'Star Wars Episode IX: The Rise of Skywalker'
    );
  });

  it('should correctly change word count color', () => {
    // Arrange
    wordsElement = movieItemDe.query(By.css('[data-testId=words]'))
      .nativeElement;
    commentElement = movieItemDe.query(By.css('[data-testId=comment]'))
      .nativeElement;
    expect(wordsElement.style.color).toBe('darkred');


    // Act
    commentElement.value = 'Comment';
    commentElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert

    expect(wordsElement.style.color).toContain('darkgreen');

    // Act
    commentElement.value = '';
    commentElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(wordsElement.style.color).toContain('darkred');
  });
});
