import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie-services.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}
  selectedMovie: Movie | undefined;
  genreText: string = "";
  defaultImagePath = "assets/images/placeholder.jpeg";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.movieService.getSelectedMovie(id).subscribe(movie => {
        if (movie == undefined) {
          this.goBack();
        } else {
          this.selectedMovie = movie;

          this.defaultImagePath = movie.imgPath;
          
          movie.genre.forEach(genreValue => {
            if(this.genreText == "") {
              this.genreText = genreValue;
            } else {
              this.genreText += ',';
              this.genreText += genreValue;
            }
          })
        }
      });
    });
  }

  goBack() {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  }
}
