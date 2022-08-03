import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { ProfileComponent } from "./profile/profile.component";

const appRoutes: Routes =[
  { path: 'welcome', component: WelcomePageComponent},
  { path: 'movies', component: MovieCardComponent},
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
