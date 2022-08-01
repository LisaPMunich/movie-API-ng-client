import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  public isLoggedIn(): boolean{
    const localStorageUser = localStorage.getItem('user');

    return !!localStorageUser;
  }
}
