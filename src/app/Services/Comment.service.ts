import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EventModel} from "../_models/event.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8081/EventComments';  // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  addComment(eventId:number,comment: string): Observable<void> {
    return this.http.post<void>(this.apiUrl+"/add", {eventId,comment});
  }
}
