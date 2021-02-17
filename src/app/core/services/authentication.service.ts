import { User } from './../models/User';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const USER_KEY_CONTROLCARE = "USER_KEY_CONTROLCARE";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  private baseUrl = environment.apiUrl + '/auth';
  private authenticateUrl = this.baseUrl + '/request-token';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(USER_KEY_CONTROLCARE)))
  }

  public authenticate(user: User): Observable<User> {
    return this.http.post<User>(this.authenticateUrl, user);
  }

  public isLoggedIn(): boolean {
    return this.currentUserSubject.value != null;
  }

  public setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  public setCurrentUserWithToken(user: User, token: string): void {
    localStorage.setItem(USER_KEY_CONTROLCARE, JSON.stringify({ user, token }));
    this.setCurrentUser(user);
  }

  /**
   * Get the user and token from local storage
   * @return the userWithToken
   */
  getStoredUserWithToken(): any {
    return JSON.parse(localStorage.getItem(USER_KEY_CONTROLCARE));
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUserSubject;
  }

  public logout(): void {
    localStorage.removeItem(USER_KEY_CONTROLCARE);
    this.currentUserSubject.next(null);
  }
}
