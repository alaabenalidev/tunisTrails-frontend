import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventService} from "../Services/Event.service";
import {Router} from "@angular/router";
import {EventModel} from "src/app/_models/event.model"
import {TokenStorageService} from "../_auth/token-storage.service";
import {AuthService} from "../_auth/auth.service";
import {User} from '../Classes/User';
import {UserService} from "../Services/User.Service";
import {ReservationService} from "../Services/Reservation.service";
import {ReservationModel} from "../_models/Reservation.model";


@Component({
  selector: 'app-agevents',
  templateUrl: './agevents.component.html',
  styleUrls: ['./agevents.component.css']
})
export class AgeventsComponent implements OnInit {

  listEvents: EventModel[] = [];
  listReservations: ReservationModel[] = [];
  selectedEvent?: EventModel;
  user!: User;

  constructor(private reservationService:ReservationService,private eventService: EventService, private router: Router, private userService: UserService,private authService: AuthService) {

  }

  loadUserData() {
    this.userService.getInfoUser().subscribe(user => {
      this.user = user;
    })
  }

  loadEvents() {
    if (sessionStorage.getItem('role') == "ADMIN")
      this.eventService.getAllEvents().subscribe(data => {
        this.listEvents = data
      })
    else
      this.eventService.getAllEventsByAgency().subscribe(data => {
        this.listEvents = data
      })
  }

  async ngOnInit(): Promise<void> {
    this.loadUserData()
    this.loadEvents()
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.selectedEvent?.idEvent ?? 0).subscribe(data => {
      this.loadEvents()
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/home']);
  }

  listParticipant(idEvent: number) {
    this.reservationService.getReservationByEvent(idEvent).subscribe(reservations => {
      this.listReservations = reservations
    })

  }
}
