import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ReservationService} from "../Services/Reservation.service";
import {ReservationModel} from "../_models/Reservation.model";
import {data} from "autoprefixer";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent {
  listReservation: ReservationModel[] = [];

  constructor(private router: Router, private reservationService: ReservationService) {
    this.loadReservation()
  }

  loadReservation() {
    this.reservationService.getAllReservations().subscribe(data => {
      this.listReservation = data
    })
  }

  navigateToAddReservation() {
    this.router.navigate(['/reservation']);
  }

  removeReservation(idReservation: number) {
    this.reservationService.deleteReservationById(idReservation).subscribe(data=>{
      this.loadReservation()
    })

  }
}
