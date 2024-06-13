import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-movie-poster',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './movie-poster.component.html',
  styleUrl: './movie-poster.component.scss',
  inputs: ['movie']
})
export class MoviePosterComponent {
  movie: Movie;
}
