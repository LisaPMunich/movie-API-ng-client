# Movie-API-Client "Green Screen" in Angular
<img src="https://user-images.githubusercontent.com/99111208/182326174-7d1479a3-3b68-4cea-a391-330f3685db9d.png">

## Description
This project is using Angular and Angular Material to build the client-side for a movie application. It complements the server-side (REST API and database). You can see the GitHub repo [here](https://github.com/LisaPMunich/Movie-API.git).


## Objective
This application was built to explore the differences of building the client-side with Angular instead of React (see client-side built in React [here](https://github.com/LisaPMunich/Movie-API-client.git))


## User Stories

* As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I have watched or am interested in.
* As a user, I want to be able to create a profile, so that I can save data about my favorite movies.

## User Flow Chart

<img src="https://user-images.githubusercontent.com/99111208/182474769-a33c392b-8922-444b-aa35-e459a4fa6219.png">

## Key Features

* welcome screen with login form & registration form
* list of all movies (after authentication)
* director dialog, genre dialog, synopsis dialog
* profile with 
  * data from registration form 
  * button to update information
  * button to delete whole profile
  * list of favorite movies (which have been selected from movie list)

This single-page-application provides the following major views - NavBar excluded:

### Welcome Screen

Welcome screen informing about purpose of the app and allowing the user to register and/or login.

<img src="https://user-images.githubusercontent.com/99111208/182326190-96b9b41e-bae7-4d17-ba36-5153a92a627a.png">

### Registration

Registering for new users (username, password, email, birthday)

<img src="https://user-images.githubusercontent.com/99111208/182326181-15ed1805-ada9-4135-9b45-af2118a21d7e.png">


### Login

log in with a username and password

<img src="https://user-images.githubusercontent.com/99111208/182326172-bc2040bf-63fb-4883-8900-2859841ccd54.png">

### Main / Movie list

* List of ALL movies 
* allows user to add and remove (toggle) a movie to their list of favorites by clicking a heart icon
* allows user to click on links to see detailed information about the genre, the director and the synopsis of the movie

<img src="https://user-images.githubusercontent.com/99111208/182326174-7d1479a3-3b68-4cea-a391-330f3685db9d.png">


### Synopsis
Clicking on a link in the movie card returns a description of the movie story.

<img src="https://user-images.githubusercontent.com/99111208/182326189-c81bf3cf-8fb7-4efd-bad9-dc83c99f3027.png">

### Genre
Clicking on a link in the movie card returns a description of the genre.

<img width="1760" alt="Screenshot_README_GenreView" src="https://user-images.githubusercontent.com/99111208/182326169-370fbcbb-5665-4338-a78c-9bccbb66bf8d.png">

### Director
Clicking on a link in the movie card returns data about the director of the movie (name, bio, birth year, death year)

<img width="1760" alt="Screenshot_README_DirectorView" src="https://user-images.githubusercontent.com/99111208/182326153-7dfc4e8b-e16c-40d0-8d64-8ea88edfd462.png">

### Profile

* Users can update their user info (username, password, email, date of birth)
* Users can delete their profile / deregister
* Display of a list of favorite movies, which were selected by clicking the heart icon in the movie card

<img src="https://user-images.githubusercontent.com/99111208/182326179-f7564c52-f60b-4e39-9f13-8440d86468c2.png">



## Project Management and Documentation

### Kanban Board (Trello) and Story Points

<img src="https://user-images.githubusercontent.com/99111208/182331877-89e84925-01ef-4933-8881-8b02c20a3398.png" width="600">

<img src="https://user-images.githubusercontent.com/99111208/182331862-38a9d761-0062-4351-a63a-a1dcb86292a1.png" width="600">

### Documentation with Swagger and TypeDoc

The API endpoints are documented with Swagger. To visit the documentation click [here](https://young-fjord-17804.herokuapp.com/documentation.html/).

For the documentation of the client-side I used TypeDoc. To visit the documentation click [here](https://lisapmunich.github.io/movie-API-ng-client/docu/).

<img src="https://user-images.githubusercontent.com/99111208/182707129-b09ec4a6-efc3-4c09-b755-b77542acaa74.png" width="600">

<img src="https://user-images.githubusercontent.com/99111208/182707136-11dc7fd6-7a69-4a50-9bd8-44c12d056b04.png" width="600">

## What challenges did I face, what did I learn? // work in progress

## ... from implementing Angular in contrast to React

I loved the determined clear file structure of the Angular project folder. Also installing the components via the Angular CLI was clean and easy. 
The template of Angular is much more readable than the React code
the AppComponent code does not generate HTML, it only fetches the data from the backend.
The biggest difference just looking at the code is that in the Angular version there is a separation of concerns that does not inherently exist in React. One has to implement it oneself.

Since Angular has built-in libraries (e.g. Material Design) and third-party integrations (e.g.API calls and testing) which can be used out of the box, I did not run into as many dependency issues as I did when working with React. 

Even though I am very happy with the result of the implementation of the client-side with Angular, I feel the need to take a Udemy course on Angular basics to better understand all the aspects of this framework before implementing the next project in Angular. 


## ... from deploying Angular app to GitHub pages

At first the deployment did not work. Not the app but the README file was deployed.
```
    "build:gh-pages": "ng build --output-path docs --base-href /movie-API-ng-client/",
    "postbuild:gh-pages": "cp docs/index.html docs/404.html && npm run build:docs"
```

## ... from generating documentation with TypeDoc

Installation of typedoc was straight-forward running
```
npm install typedoc --save-dev
```
Then I defined the typedocOptions in the tsconfig.json file:
```
"typedocOptions": {
  "entryPoints": ["src/main.ts"],
  "out": "docs"
}
```

**Problems with this approach:** 
1. When running the build command for the documentation ($ typedoc src/main.ts) everything was generated except for the classes (my components/views) and interfaces directory.
2. When deploying the docs to GitHub pages, the documentation kept overwriting my deployment of the application and using the index.html.


**Solution:** 
1. The reason was that the default generation of typedoc does not suffice. I had to specify the [entryPointStrategy](https://typedoc.org/guides/options/#entrypointstrategy) as "expand" in the tsconfig.json file in order to remedy that. Afterwards the typedocOptions looked like this
  ```
  "typedocOptions": {
    "entryPoints": ["src/main.ts"],
    "entryPointStrategy": "expand",
    "out": "docs"
  }
  ```
2. I had to further adjust the typedocOptions in the package.json and moved the documentation to docs/docu to stop overwriting index.html of the app.
  ```
  "typedocOptions": {
  "entryPoints": ["src/main.ts"],
  "entryPointStrategy": "expand",
  "out": "docs/docu/"
  }
  ```

Also, when running the command to generate the documentation, the entry point should be a general "./src"
```
typedoc --tsconfig tsconfig.json ./src       
```
I documented the build command for docs in the **package.json** as follows:
```
"build:docs": "typedoc --tsconfig tsconfig.json ./src"
```

## Further Information

<details>
  <summary>Click to expand!</summary>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

</details>
