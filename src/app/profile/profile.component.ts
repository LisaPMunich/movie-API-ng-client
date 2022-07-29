import {Component, Input, OnInit} from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCardActions } from "@angular/material/card";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() userData = { Name: '', Password: '', Email: '', Birthday: ''};

  constructor(
    private router: Router,
    public fetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    public snackBar: MatSnackBar,
    public MatCardActions: MatCardActions,
  ) { }

  ngOnInit(): void {

  }

  updateUser() {
    this.fetchApiDataService.updateUser(
      this.userData
    ).subscribe((resp: IUser) => {
      this.snackBar.open('User updated.')
      localStorage.setItem('user', resp.Name);
    });
  }

  deleteUser() {
    this.fetchApiDataService.deleteUser(this.userData.Name).subscribe((resp: IUser[]) => {
      localStorage.removeItem('user');
      this.router.navigate(['register'])
    });
  }
}
