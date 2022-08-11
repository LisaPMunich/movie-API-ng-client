import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // close the dialog on success
import { FetchApiDataService } from "../fetch-api-data.service"; // import API calls
import { MatSnackBar } from "@angular/material/snack-bar"; // display notifications back to the user
import { Router } from '@angular/router';
import {UserService} from "../user.service";


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Name: '', Password: '' };

  constructor(
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
  }

  /**
   * gets user Name and token from API call userLogin, displays success or error message, navigates to Movie list /Homepage
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result:ILoggedInUser) => {
      console.log(result);

      localStorage.setItem('user', result.user.Name);
      localStorage.setItem('token', result.token);
      this.dialogRef.close();
      this.snackBar.open(result.user.Name, 'Login successful', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'Login Error', {
        duration: 2000
      });
    });
  }

}
