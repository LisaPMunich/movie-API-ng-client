import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}


  /**
   * verifies if user is logged in
   * @returns boolean
   */
  public isLoggedIn(): boolean{
    const localStorageUser = localStorage.getItem('user');

    return !!localStorageUser;
  }

  /**
   * retrieves the user from local storage
   * @returns name of user
   */
  public getName(): string|null {
    return localStorage.getItem('user');
  }
}
