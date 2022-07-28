import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: IMovie[] = [];
  constructor(public fetchApiDataService: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void{
    this.fetchApiDataService.getAllMovies().subscribe((resp: IMovie[]) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies
    });
  }
}
