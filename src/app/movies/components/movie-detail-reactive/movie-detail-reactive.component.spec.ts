import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailReactiveComponent } from './movie-detail-reactive.component';

describe('MovieDetailReactiveComponent', () => {
  let component: MovieDetailReactiveComponent;
  let fixture: ComponentFixture<MovieDetailReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
