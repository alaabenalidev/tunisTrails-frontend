import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EventModel} from "../_models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/api/events';  // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  createEvent(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.apiUrl, event);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getAllEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl);
  }

  getAllEventsByAgency(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl+'/by-agency');
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
