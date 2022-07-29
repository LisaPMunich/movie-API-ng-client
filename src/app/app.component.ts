import { Component} from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GreenScreen-Angular-client';

  constructor() { }
  // this functions opens the dialog when signup button is clicked
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: '500px'
  //   });
  // }
}
