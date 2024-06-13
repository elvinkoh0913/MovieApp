import { Routes } from '@angular/router';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieListingComponent } from './pages/movie-listing/movie-listing.component';

export const routes: Routes = [
    {
        path: 'movie-detail/:id',
        component: MovieDetailComponent
    },
    {
        path: 'movie-listing',
        component: MovieListingComponent
    },
    {
        path: '', pathMatch: 'full', redirectTo: 'movie-listing'
    }
];
