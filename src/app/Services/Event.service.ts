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

    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('type', event.type);
    formData.append('ville', event.ville);
    formData.append('image', event.image, 'image');
    formData.append('description', event.description);
    formData.append('startDate', event.startDate.toString());
    formData.append('endDate', event.endDate.toString());
    formData.append('latitude', event.latitude);
    formData.append('longitude', event.longitude);
    formData.append('maxParticipants', event.maxParticipants.toString());

    return this.http.post<EventModel>(this.apiUrl, formData);
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

  searchByCri(keyword:string,type:string): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.apiUrl}/search?type=${type}&keyword=${keyword}`);
  }
}
