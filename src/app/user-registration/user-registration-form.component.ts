import {Component, OnInit, Input} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'; // close the dialog on success
import {FetchApiDataService} from "../fetch-api-data.service"; // import API calls
import {MatSnackBar} from "@angular/material/snack-bar"; // display notifications back to the user
import {MatCardActions} from "@angular/material/card";
import {UserService} from "../user.service";
import {UserLoginFormComponent} from "../user-login/user-login-form.component";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {Name: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public MatCardActions: MatCardActions,
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   *  sends form inputs from user registration to the backend
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result: IUser) => {
          this.dialogRef.close(); // close modal on success
          this.snackBar.open(result.Name, 'successfully registered', {
            duration: 2000
          });

          this.dialog.open(UserLoginFormComponent, {
            width: '280px',
          });
        },(result) => {
          this.snackBar.open(result, 'Registration Error', {
            duration: 2000
          });
        });
    }
  }
