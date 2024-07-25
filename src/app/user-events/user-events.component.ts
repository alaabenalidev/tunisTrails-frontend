import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../Services/Reservation.service";
import {data} from "autoprefixer";
import {ReservationAddRequest, ReservationModel} from "../_models/Reservation.model";
import {CommentService} from "../Services/Comment.service";
import {RatingService} from "../Services/Rating.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EventService} from "../Services/Event.service";
import {EventModel} from "../_models/event.model";

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {
  listReservations: ReservationModel[] = [];
  listEvents: EventModel[] = [];
  form: FormGroup;
  commentText: string = "";
  selectedEventId: number = -1;
  searchKeyword: string = '';
  selectType: string = '';


  constructor(private reservationService: ReservationService, private eventService: EventService, private router: Router, private fb: FormBuilder, private commentService: CommentService, private ratingService: RatingService) {
    // this.loadReservation()
    this.loadEvents()
    this.form = this.fb.group({
      event: [0, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberOfParticipants: ['', [Validators.required, Validators.min(1)]],
      adults: ['', [Validators.required, Validators.min(1)]],
      childrens: ['', [Validators.required, Validators.min(1)]]
    });
  }

  loadReservation() {
    this.reservationService.getAllReservations().subscribe(data => {
      this.listReservations = data
    })
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.listEvents = data
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submitComment(idEvent: number): void {
    this.commentService.addComment(idEvent, this.commentText).subscribe(() => {
      this.commentText = "";
      this.loadReservation()
    })
  }


  submitRating(idEvent: number, stars: number) {
    this.ratingService.addRating(idEvent, stars).subscribe(() => {
      this.loadReservation()
    })
  }

  onSubmitReservation(): void {
    this.form.get('event')?.setValue(this.selectedEventId);
    if (this.form.valid) {
      let reservation: ReservationAddRequest = this.form.value
      if (reservation.adults + reservation.childrens > reservation.numberOfParticipants) {
        alert("Vérifier le nbre de part avec nbre adultes et enfants")
        return;
      }
      this.reservationService.addReservation(reservation).subscribe(data => {
        this.router.navigate(['/user-history']);
      })
    } else {
      // Handle form errors if needed
    }
  }

  searchByKeyword() {
    this.eventService.searchByCri(this.searchKeyword, this.selectType).subscribe(data => {
      console.log(data)
      this.listEvents = data
    })
  }
}
