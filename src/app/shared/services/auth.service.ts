import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly USER_ROLE_KEY = 'userRole';

  login(username: string, password: string): Observable<boolean> {
    // Simulate login logic
    // Check if the credentials are valid and set the user role
    if (username === 'user' && password === 'password') {
      localStorage.setItem(this.USER_ROLE_KEY, 'user');
      return of(true);
    } else if (username === 'admin' && password === 'password') {
      localStorage.setItem(this.USER_ROLE_KEY, 'admin');
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    // Simulate logout logic
    localStorage.removeItem(this.USER_ROLE_KEY);
  }

  getUserRole(): string | null {
    // Get the user role from local storage
    return localStorage.getItem(this.USER_ROLE_KEY);
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in by verifying if the user role is set in local storage
    return this.getUserRole() !== null;
  }
}
