import {Component} from '@angular/core';
import {UserService} from "./user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GreenScreen-Angular-client';

  constructor(
    public userService: UserService,
  ) {
  }

  public isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
