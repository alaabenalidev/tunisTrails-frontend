import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EventModel} from "../_models/event.model";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8081/Ratings';  // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  addRating(eventId:number,stars: number): Observable<void> {
    return this.http.post<void>(this.apiUrl+"/add", {eventId,stars});
  }
}
