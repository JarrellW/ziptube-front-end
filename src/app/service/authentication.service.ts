import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../app.constants';
import { map } from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';
export const VIDEOID = 'videoId';
export const MYVIDEOID = 'myVideoId';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  username!: string;

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService = (username: string, password: string) => this.http.post<any>(
    `${API_URL}/authenticate`, {
      username,
      password
    }
  ).pipe(
    map(
      response => {
        sessionStorage.setItem(AUTHENTICATED_USER, username);
        sessionStorage.setItem(TOKEN, `Bearer ${response.token}`);
        sessionStorage.removeItem(VIDEOID);
        sessionStorage.removeItem(MYVIDEOID);
        return response;
      }
    )
  )
  getAuthenticatedUser = () => {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }
  // @ts-ignore
  getAuthenticatedToken = () => {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }
  isUserLoggedIn = () => {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }
  logout = () => {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(VIDEOID);
    sessionStorage.removeItem(MYVIDEOID);
  }
}
