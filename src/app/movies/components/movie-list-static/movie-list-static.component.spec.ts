import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MovieListStaticComponent } from './movie-list-static.component';

describe('MovieListStaticComponent', () => {
  let component: MovieListStaticComponent;
  let fixture: ComponentFixture<MovieListStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListStaticComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
