import {Component, Input, OnInit} from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {UserService} from "../user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: IUser = {Name: '', Password: '', Email: '', Birthday: '',};
  favoriteMovies: IMovie[] = [];
  movies: IMovie[] = [];

  constructor(
    private router: Router,
    public userService: UserService,
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userName = this.userService.getName();

    if (!userName) {
      throw new Error('Unknown User in ProfileComponent');
    }

    this.fetchApiDataService.loadUser(userName)
      .subscribe((response: IUser) => {
        const birthdayDate = new Date(Date.parse(response.Birthday));

        // Kudos go to https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
        // Using "ko-KR" because it has the correct order yyyy-mm-dd I needed for Bootstrap Datepicker..
        const birthdayString = birthdayDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replace(/\. /g, '-').replace('.', '');

        this.user = {
          ...response,
          Password: '',
          Birthday: birthdayString,
        };

        this.loadAllMovies();
      });
  }

  loadAllMovies(): void {
    this.fetchApiDataService.loadAllMovies()
      .subscribe((resp: IMovie[]) => {
        this.movies = resp;

        this.favoriteMovies = this.movies.filter(movie => this.user.FavoriteMovies?.includes(movie._id));
      });
  }

  updateUser() {
    this.fetchApiDataService.updateUser(
      this.user
    ).subscribe((resp: IUser) => {
      this.snackBar.open('User updated.')
      localStorage.setItem('user', resp.Name);
    });
  }

  deleteUser() {
    this.fetchApiDataService.deleteUser(this.user.Name).subscribe((resp: IUser[]) => {
      localStorage.removeItem('user');
      this.router.navigate(['welcome'])
    });
  }
}
