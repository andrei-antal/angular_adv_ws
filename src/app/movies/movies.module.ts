import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from '../movies/components/movie-detail/movie-detail.component';
import { MovieListStaticComponent } from './components/movie-list-static/movie-list-static.component';
import { MovieItemSimpleComponent } from './components/movie-item-simple/movie-item-simple.component';
import { WordCountPipe } from './pipes/word-count.pipe';
import { MovieImageFallbackDirective } from './directives/movie-image-fallback.directive';
import { RatingComponent } from './components/rating/rating.component';
import { GenreValidatorDirective } from './directives/genre-validator.directive';
import { MovieDetailReactiveComponent } from '../movies/components/movie-detail-reactive/movie-detail-reactive.component';
import { reducer } from './store/movies.reducers';

@NgModule({
  declarations: [
    MovieItemComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieListStaticComponent,
    MovieItemSimpleComponent,
    WordCountPipe,
    MovieImageFallbackDirective,
    RatingComponent,
    GenreValidatorDirective,
    MovieDetailReactiveComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: MovieListComponent },
      // { path: '', component: MovieItemSimpleComponent },
      // { path: '', component: MovieListStaticComponent },
      { path: 'new', component: MovieDetailReactiveComponent }, // movies/new
      { path: ':id', component: MovieDetailReactiveComponent }, // movies/1
    ]),
    StoreModule.forFeature('moviesFeature', reducer),
  ],
  exports: [MovieListComponent],
})
export class MoviesModule {}
