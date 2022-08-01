import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre/genre-dialog.component';
import { DirectorDialogComponent } from '../director/director-dialog.component';
import { MovieDetailDialogComponent } from '../movie-detail/movie-detail-dialog.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: IMovie[] = [];
  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialog: MatDialog,

) { }

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

  // this functions opens the dialog when Genre button is clicked
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  // this functions opens the dialog when Director button is clicked
  openDirectorDialog(Name: string, Bio: string, Birth: string, Death?: string ): void {
    this.dialog.open(DirectorDialogComponent, {
        data:{
            Name: Name,
            Bio: Bio,
            Birth: Birth,
            Death: Death,
        },
      width: '500px'
    });
  }

  // this functions opens the dialog when Synopsys button is clicked
  openMovieDetailDialog(Title: string, Description: string): void {
    this.dialog.open(MovieDetailDialogComponent, {
  data: {
    Title: Title,
    Description: Description,
  },
      width: '500px'
    });
  }
}
