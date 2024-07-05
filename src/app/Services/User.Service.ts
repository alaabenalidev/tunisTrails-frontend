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
  private BASE_URL_User = 'http://localhost:8081/User/'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL_AUTH}/register`, user);
  }

  getInfoUser(): Observable<User> {
    return this.http.get<User>(this.BASE_URL + 'get-info');
  }
  getsUserAgency(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL_User + 'get-users/admin');
  }

  deleteUser(selectedUserId: number) {
    return this.http.delete<User>(`${this.BASE_URL_User}delete/${selectedUserId}`);
  }

  enableUser(selectedUserId: number) {
    return this.http.put(`${this.BASE_URL_User}enable/${selectedUserId}`, selectedUserId);
  }

  disableUser(selectedUserId: number) {
    return this.http.put(`${this.BASE_URL_User}disable/${selectedUserId}`, selectedUserId);
  }

  updateProfile(user: User){
    return this.http.put(`${this.BASE_URL_User}update/${user.id}`, user);
  }
}
