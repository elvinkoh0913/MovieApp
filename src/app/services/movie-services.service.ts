import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, delay, map } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovieList(): Observable<Movie[]> {
    let endpoint = "/mock-data/movie-list.json";

    return this.http.get<Movie[]>(endpoint);
  }

  getSelectedMovie(id: number): Observable<Movie | undefined> {
    return this.getMovieList().pipe(map((movieList: Movie[]) => {
      let selectedMovie = movieList.find(movie => movie.id == id);
      return selectedMovie;
    }));
  }
}
