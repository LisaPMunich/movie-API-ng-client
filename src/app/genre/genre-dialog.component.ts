import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'; // close the dialog on success
import {FetchApiDataService} from "../fetch-api-data.service"; // import API calls
import {MatSnackBar} from "@angular/material/snack-bar"; // display notifications back to the user
import {MatCardActions} from "@angular/material/card";

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public genre: {
      Name: string,
      Description: string,
    },
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }
}
