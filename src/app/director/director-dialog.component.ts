import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'; // close the dialog on success
import {FetchApiDataService} from "../fetch-api-data.service"; // import API calls
import {MatSnackBar} from "@angular/material/snack-bar"; // display notifications back to the user


@Component({
  selector: 'app-director',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent implements OnInit {

  constructor(
  @Inject(MAT_DIALOG_DATA)
  public director: IDirector,
  public fetchApiData: FetchApiDataService,
  public snackBar: MatSnackBar,
) { }

  ngOnInit(): void {
    this.director.Death = this.director.Death?.trim();
  }

}
