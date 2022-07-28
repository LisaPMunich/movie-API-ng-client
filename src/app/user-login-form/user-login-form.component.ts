import {Component, OnInit, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog'; // close the dialog on success
import {FetchApiDataService} from "../fetch-api-data.service"; // import API calls
import {MatSnackBar} from "@angular/material/snack-bar"; // display notifications back to the user

import {MatCardActions} from "@angular/material/card";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Name: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public MatCardActions: MatCardActions,
  ) {}

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result:ILoggedInUser) => {
      console.log(result);
      localStorage.setItem('user', result.user.Name);
      localStorage.setItem('token', result.token);
      this.dialogRef.close();
      this.snackBar.open(result.user.Name, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'Login Error', {
        duration: 2000
      });
    });
  }

}
