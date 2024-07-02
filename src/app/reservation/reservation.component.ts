import {Component, OnInit} from '@angular/core';
import {EventService} from "../Services/Event.service";
import {Router} from "@angular/router";
import {UserService} from "../Services/User.Service";
import {EventModel} from "../_models/event.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationAddRequest, ReservationModel} from "../_models/Reservation.model";
import {ReservationService} from "../Services/Reservation.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  form: FormGroup;
  listEvents: EventModel[] = [];

  constructor(private eventService: EventService, private router: Router, private fb: FormBuilder,private reservationService: ReservationService) {
    this.form = this.fb.group({
      event: [0, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberOfParticipants: ['', [Validators.required, Validators.min(1)]],
      adults: ['', [Validators.required, Validators.min(1)]],
      childrens: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadEvents()
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.listEvents = data
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      let reservation: ReservationAddRequest = this.form.value
      if (reservation.adults + reservation.childrens > reservation.numberOfParticipants) {
        alert("Vérifier le nbre de part avec nbre adultes et enfants")
        return;
      }
      this.reservationService.addReservation(reservation).subscribe(data=>{
        this.router.navigate(['/user-history']);
      })
    } else {
      // Handle form errors if needed
    }
  }

}
