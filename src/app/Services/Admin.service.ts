import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../Classes/Admin';

@Injectable({
  providedIn: 'root'
})
export class Adminservice {
  private apiUrl = 'http://localhost:8081/Admin'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  addAdmin(admin: Admin): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`http://localhost:8081/Admin/add`, admin, { headers });
  }
}
