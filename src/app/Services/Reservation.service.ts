import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ReservationAddRequest, ReservationModel} from "../_models/Reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8081/Reservation';

  constructor(private http: HttpClient) { }

  addReservation(reservation: ReservationAddRequest): Observable<ReservationModel> {
    return this.http.post<ReservationModel>(`${this.apiUrl}/add`, reservation);
  }

  deleteReservationById(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${reservationId}`);
  }

  updateReservation(reservationId: number, reservation: ReservationModel): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(`${this.apiUrl}/updateReservation/${reservationId}`, reservation);
  }

  getAllReservations(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(`${this.apiUrl}`);
  }

  findReservationById(reservationId: number): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${this.apiUrl}/findReservationById/${reservationId}`);
  }
}
