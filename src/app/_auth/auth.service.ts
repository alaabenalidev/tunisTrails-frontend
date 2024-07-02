import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment";
import {environment as envProd} from "../../environments/environment.prod";
import {User} from "../Classes/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private BASE_URL: string = environment.apiUrl + 'api/v1/auth/'
  private BASE_URL_UPLOAD_IMAGE: string = 'http://localhost:3006/image/'

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    if (!isDevMode())
      this.BASE_URL = envProd.apiUrl + 'api/v1/auth/'
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  isLoggedIn(): boolean {
    return this.tokenStorageService.hasToken()
  }

  login(email: string, password: string): Observable<{ access_token: string, refresh_token: string, role: string }> {
    return this.http.post<{
      access_token: string,
      refresh_token: string,
      role: string
    }>(this.BASE_URL + 'authenticate', {email: email, password: password});
  }

  register(user: User): Observable<{ access_token: string, refresh_token: string }> {
    return this.http.post<{ access_token: string, refresh_token: string }>(this.BASE_URL + 'register', user);
  }



  logout() {
    this.tokenStorageService.signOut();
  }

  isUserInRole(roleFromRoute: string) {
    const roles = localStorage.getItem("app.roles");

    if (roles!.includes(",")) {
      if (roles === roleFromRoute) {
        return true;
      }
    } else {
      const roleArray = roles!.split(",");
      for (let role of roleArray) {
        if (role === roleFromRoute) {
          return true;
        }
      }
    }
    return false;
  }
}
