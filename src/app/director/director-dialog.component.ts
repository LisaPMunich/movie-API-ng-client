import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'; // close the dialog on success
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
    /*
    database contains directors, who are still alive, therefore category "Death" should not be displayed in dialog. In one case also the Birthdate of a director is unknown. Since backend does not return null but an empty string (' ') in that case, despite the *ngIf directive in the director template the category "Death" will be displayed in dialog. Therefore, the whitespace of the value given for director.Death has to be removed in order to make the directive apply. This way the categories "Death" or "Birth" are not displayed, if no data are available.
     */
    this.director.Death = this.director.Death?.trim();
    this.director.Birth = this.director.Birth?.trim();
  }

}
