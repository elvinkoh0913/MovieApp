import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-services.service';
import { Observable, Subject, Subscription, debounce, distinctUntilChanged, switchMap, timer } from 'rxjs';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { MoviePosterComponent } from '../../components/movie-poster/movie-poster.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-listing',
  standalone: true,
  imports: [CommonModule, MoviePosterComponent],
  templateUrl: './movie-listing.component.html',
  styleUrl: './movie-listing.component.scss'
})
export class MovieListingComponent implements OnInit, OnDestroy {

  searchText = new Subject<string>();

  constructor(private movieService: MovieService, private router: Router) {}
  movieListingSub: Subscription = new Subscription();
  movieSearchSub: Subscription = new Subscription();
  defaultmovieList: Movie[] = [];
  movieListResult: Movie[] = [];

  ngOnInit(): void {
    this.movieListingSub = this.movieService.getMovieList().subscribe(movieListArr => {
      movieListArr.forEach((movie: Movie) => {
        this.defaultmovieList.push(movie);
      });
    });

    this.movieListResult = this.defaultmovieList;

    this.movieSearchSub = this.searchText.pipe(
      debounce(() => timer(1000)), 
      distinctUntilChanged(),
      switchMap(term => this.searchResult(term))
    ).subscribe(results => {
      this.movieListResult = results;
    });
  }
  
  ngOnDestroy(): void {
    this.movieListingSub.unsubscribe();
    this.movieSearchSub.unsubscribe();
  }

  goToDetails(movieId: number) {
    this.router.navigate(['/movie-detail/' + movieId]);
  }

  onKeyup(event: any) {
    let input = event.target.value;
    this.searchText.next(input);
  }

  searchResult(text: string): Observable<any> {
    return new Observable(observer => {
      if (text == "") {
        observer.next(this.defaultmovieList);
      } else {
        this.movieListResult = this.defaultmovieList.filter(movie => movie.name.toLowerCase().includes(text));
        observer.next(this.movieListResult);
      }
      
      observer.complete();
    });
  }
}
