import {Component, OnInit} from '@angular/core';
import {FetchApiDataService} from "../fetch-api-data.service";
import {MatDialog} from '@angular/material/dialog';
import {GenreDialogComponent} from '../genre/genre-dialog.component';
import {DirectorDialogComponent} from '../director/director-dialog.component';
import {MovieDetailDialogComponent} from '../movie-detail/movie-detail-dialog.component';
import {UserService} from "../user.service";


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: IMovie[] = [];
  favoriteMovies: string[] = [];
  user: IUser = {Name: '', Email: '', Birthday: '', Password: '', FavoriteMovies: []};

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public userService: UserService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  /**
   * gets movies from API call and returns array if movies
   * @returns array of movie objects
   */
  getMovies(): void {
    this.fetchApiDataService
      .loadAllMovies()
      .subscribe((resp: IMovie[]) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies
      });
  }

  /**
   * gets user data from API call and an array of favorite movies
   */
  getUser(): void {
    const userName = this.userService.getName();

    if (!userName) {
      throw new Error('Unknown User in MovieCardComponent');
    }

    this.fetchApiDataService
      .loadUser(userName)
      .subscribe((response: IUser) => {
        this.favoriteMovies = response.FavoriteMovies || [];
        this.user = response;
      })
  }

  /**
   *   this functions opens the genre dialog when Genre button is clicked
   *   @param name
   *   @param description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * this functions opens the director dialog when Director button is clicked
   * @param Name
   * @param Bio
   * @param Birth
   * @param Death
   */
  openDirectorDialog(Name: string, Bio: string, Birth?: string, Death?: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: Name,
        Bio: Bio,
        Birth: Birth,
        Death: Death,
      },
      width: '500px'
    });
  }

  // this functions opens the dialog when Synopsys button is clicked
  /**
   * this functions opens the dialog when Synopsys button is clicked
   * @param Title
   * @param Description
   */
  openMovieDetailDialog(Title: string, Description: string): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        Title: Title,
        Description: Description,
      },
      width: '500px'
    });
  }

  /**
   * check, if movie is in user's favorite list
   * @param _id The id of the movie which should be checked for being a Favorite
   * @returns boolean
   */
  isFav(_id: string): boolean {
    return this.favoriteMovies.includes(_id);
  }

  /**
   * deselects movie as favorite movie
   * @param name (name of user)
   * @param title (title of movie)
   */
  deselectAsFavoriteMovie(name: string, title: string): void {
    this.fetchApiDataService.deleteFavoriteMovies(
      name,
      title
    ).subscribe((result) => {
      this.ngOnInit();
    })
  }

  /**
   * selects movie as favorite movie
   * @param name (name of user)
   * @param title (title of movie)
   */
  selectAsFavoriteMovie(name: string, title: string): void {
    this.fetchApiDataService.addFavoriteMovies(name, title).subscribe((result) => {
      this.getUser()
    })
  }
}
