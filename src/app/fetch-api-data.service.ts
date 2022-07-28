import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';


const apiURL = 'https://young-fjord-17804.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  // This will provide HttpClient to the entire class, making it available via this.http
  apiURL = 'https://young-fjord-17804.herokuapp.com/';

  constructor(private http: HttpClient) {
  }

  // make API call for the user registration endpoint
  // @param userDetails
  // @returns new user object in JSON
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiURL + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  // make API call for login of existing user
  // @param userDetails
  // @returns data of user in JSON
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiURL + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }


  // make API call to get all movies
  // @returns array of all movie objects in JSON

  getAllMovies(): Observable<any> {
    return this.http
      .get<IMovie[]>(apiURL + 'movies', { headers: this.getHttpHeaders() })
      .pipe(
        map((res: IMovie[]) => res || []),
        catchError(this.handleError)
      );
  }

  // make API call to get single movie by title
  // @param title
  // @returns JSON object holding movie data

  getSingleMovie(title: string): Observable<any> {

    return this.http
      .get<IMovie>(apiURL + `movies/${title}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res: IMovie) => res || {}),
        catchError(this.handleError)
      );
  }


  // make API call to get director by name
  // @param name
  // @returns JSON object holding director data

  getDirector(name: string): Observable<any> {

    return this.http
      .get<IDirector>(apiURL + `movies/director/${name}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res: IDirector) => res || {}),
        catchError(this.handleError)
      );
  }

  // make API call to get genre by name
  // @param name
  // @returns JSON object holding genre data

  getGenre(name: string): Observable<any> {

    return this.http
      .get<IGenre>(apiURL + `movies/genre/${name}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res: IGenre) => res || {}),
        catchError(this.handleError)
      );
  }

  // make API call to get users by name
  // @param name
  // @returns JSON object holding user data

  getUser(name: string): Observable<any> {

    return this.http
      .get<IUser>(apiURL + `users/${name}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res: IUser) => res || {}),
        catchError(this.handleError)
      );
  }

  // make API call to update user profile by name
  // @param name
  // @returns JSON object holding user data

  updateUser(name: string): Observable<any> {

    return this.http
      .put<IUser>(apiURL + `users/${name}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res: IUser) => res || {}),
        catchError(this.handleError)
      );
  }

  // make API call to delete user profile by name
  // @param name
  // @returns string message

  deleteUser(name: string): Observable<any> {
    return this.http
      .delete<string>(apiURL + `users/${name}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res:string) => res),
        catchError(this.handleError)
      );
  }

  // make API call to get favorite movies of one user by name
  // @param name, title
  // @returns array of strings in JSON object holding favorite movies of user

  getFavoriteMovies(name: string, title: string): Observable<any> {
    // Get Authorization token stored in local storage

    return this.http
      .get<IUser>(apiURL + `users/${name}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res: IUser) => res.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  // make API call to add favorite movies to user profileby name and title
  // @param name, title
  // @returns JSON object holding movie data

  addFavoriteMovies<IMovie>(name: string, title: string): Observable<any> {
    // Get Authorization token stored in local storage

    return this.http
      .post<IMovie>(apiURL + `users/${name}/movies/${title}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res: IMovie) => res || {}),
        catchError(this.handleError)
      );
  }


  // make API call to delete favorite movies from user profile by name and title
  // @param name, title
  // @returns JSON object holding movie data

  getHttpHeaders(){
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  }

  deleteFavoriteMovies<IMovie>(name: string, title: string): Observable<any> {
    // Get Authorization token stored in local storage
    return this.http
      .delete<IMovie>(apiURL + `users/${name}/movies/${title}`, {headers: this.getHttpHeaders()})
      .pipe(
        map((res: IMovie) => res || {}),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return new Error(
      'Something bad happened; please try again later.'
    );
  }
}


