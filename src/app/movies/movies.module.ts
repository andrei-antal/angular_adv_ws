import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from '../movies/components/movie-detail/movie-detail.component';
import { MovieListStaticComponent } from './components/movie-list-static/movie-list-static.component';
import { MovieItemSimpleComponent } from './components/movie-item-simple/movie-item-simple.component';

@NgModule({
  declarations: [
    MovieItemComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieListStaticComponent,
    MovieItemSimpleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: MovieListComponent },
      // { path: '', component: MovieItemSimpleComponent },
      // { path: '', component: MovieListStaticComponent },
      { path: 'new', component: MovieDetailComponent }, // movies/new
      { path: ':id', component: MovieDetailComponent }, // movies/1
    ]),
  ],
  exports: [MovieListComponent],
})
export class MoviesModule {}
