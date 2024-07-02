import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Classes/User';  // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL_AUTH = 'http://localhost:8081/auth'; // Replace with your actual backend URL
  private BASE_URL = 'http://localhost:8081/api/v1/users/'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL_AUTH}/register`, user);
  }

  getInfoUser(): Observable<User> {
    return this.http.get<User>(this.BASE_URL + 'get-info');
  }
}
