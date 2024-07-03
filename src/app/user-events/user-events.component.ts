import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../Services/Reservation.service";
import {data} from "autoprefixer";
import {ReservationModel} from "../_models/Reservation.model";
import {CommentService} from "../Services/Comment.service";
import {RatingService} from "../Services/Rating.service";

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {
  listReservations: ReservationModel[] = [];
  commentText: string="";

  constructor(private reservationService: ReservationService, private commentService:CommentService, private ratingService:RatingService) {
    this.loadReservation()
  }

  loadReservation() {
    this.reservationService.getReservationByUser().subscribe(data => {
      this.listReservations = data
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submitComment(idEvent:number): void {
    this.commentService.addComment(idEvent,this.commentText).subscribe(()=>{
      this.commentText ="";
      this.loadReservation()
    })
  }


  submitRating(idEvent: number,stars:number) {
    this.ratingService.addRating(idEvent,stars).subscribe(()=>{
      this.loadReservation()
    })
  }
}
