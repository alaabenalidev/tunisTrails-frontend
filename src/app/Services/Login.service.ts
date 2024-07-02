import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  jwt: string;
  name: string;
  role: string;
  id: string;
  mfaEnabled: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/auth/login'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthenticationResponse> {
    const request: AuthenticationRequest = { email, password };
    return this.http.post<AuthenticationResponse>(this.apiUrl, request);
  }
}
